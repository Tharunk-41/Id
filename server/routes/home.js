const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/doctors', (req, res) => {
    const { page = 1, limit = 10, query = '' } = req.query;
    const offset = (page - 1) * limit;

    const searchCondition = query
      ? `WHERE \`KOL Name\` LIKE '%${query}%'`
      : '';

    const queryStr = `
      SELECT 
        Image,
        \`KOL ID\`,
        \`First name\`, 
        \`Last name\`, 
        Affiliation, 
        Specialty,
        Country,
        Salutation,
        Suffix,
        \`KOL Rank\`,
        ROUND(\`KOL Score\`, 2) as \`KOL Score\`,
        \`Congress Count\`,
        \`Key topic Trials Count\`,
        \`Key topic Pubs Count\`,
        \`ASSOCIATION Count\`
      FROM ranking_sheet
      ${searchCondition}
      ORDER BY \`KOL Rank\` ASC
      LIMIT ${limit} OFFSET ${offset};
    `;

    const countQuery = `
      SELECT COUNT(*) as total 
      FROM ranking_sheet
      ${searchCondition};
    `;

    db.query(queryStr, (err, results) => {
      if (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).send('Error fetching doctors');
        return;
      }

      db.query(countQuery, (err, countResults) => {
        if (err) {
          console.error('Error fetching count:', err);
          res.status(500).send('Error fetching count');
          return;
        }

        const totalItems = countResults[0].total;
        res.json({ doctors: results, totalItems });
      });
    });
  });

  router.get('/weightages', (req, res) => {
    const query = 'SELECT * FROM weightages';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching weightages:', err);
        res.status(500).send('Error fetching weightages');
        return;
      }
      res.json(results);
    });
  });

  router.post('/update-weightages', (req, res) => {
    const weightages = req.body;
    if (!Array.isArray(weightages)) {
      return res.status(400).send('Invalid input');
    }
    let errorOccurred = false;
    weightages.forEach(weightage => {
      const { column_name, weightage: value } = weightage; // Updated keys to match payload
      const query = `UPDATE weightages SET weightage = ? WHERE column_name = ?`;

      db.query(query, [value, column_name], (err, results) => {
        if (err) {
          console.error('Error updating weightages:', err);
          errorOccurred = true;
          return;
        }
      });
    });
    if (errorOccurred) {
      return res.status(500).send('Error updating weightages');
    }
    res.send('Weightages updated successfully');
  });

  router.get('/weightages/all', (req, res) => {
    const query = `
      SELECT 
        column_name,
        max,
        median 
      FROM weightages
      WHERE column_name IN (
        'Congress Count', 
        'Key topic Trials Count', 
        'Key topic Pubs Count', 
        'ASSOCIATION Count',
        'Principal Investigator',
        'First Author Pubs Count'
      );
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching weightage data:', err);
        res.status(500).send('Error fetching weightage data');
        return;
      }
      res.json(results);
    });
  });

  router.get('/top-states', (req, res) => {
    const query = `
      SELECT State, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY State
      ORDER BY KOL_Count DESC
      LIMIT 10;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  // New endpoints
  router.get('/top-specialties', (req, res) => {
    const query = `
      SELECT Specialty, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY Specialty
      ORDER BY KOL_Count DESC
      LIMIT 10;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  router.get('/top-affiliations', (req, res) => {
    const query = `
      SELECT Affiliation, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY Affiliation
      ORDER BY KOL_Count DESC
      LIMIT 10;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  router.get('/top-cities', (req, res) => {
    const query = `
      SELECT City, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY City
      ORDER BY KOL_Count DESC
      LIMIT 10;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  router.get('/state-kol-counts', (req, res) => {
    const query = `
        SELECT State, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
        FROM ranking_sheet
        GROUP BY State;
      `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  router.get('/top-conferences', (req, res) => {
    const query = `
        SELECT \`Conference Name\`, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
        FROM events_data
        GROUP BY \`Conference Name\`
        ORDER BY KOL_Count DESC
        LIMIT 10;
      `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  // Add new endpoint for top 10 keywords in publications
  router.get('/top-keywords-publications', (req, res) => {
    const fetchColumnsQuery = `
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'pubs_trials'
        AND COLUMN_NAME LIKE BINARY 'PUBS\\_%';
      `;

    db.query(fetchColumnsQuery, (err, columnsResults) => {
      if (err) {
        console.error('Error fetching column names:', err);
        return res.status(500).send('Server error');
      }

      const columns = columnsResults.map(row => row.COLUMN_NAME);
      const sumQueries = columns.map(col => `SUM(\`${col}\`) AS \`${col}\``).join(', ');

      const query = `
          SELECT ${sumQueries}
          FROM pubs_trials;
        `;

      db.query(query, (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).send('Server error');
        }

        const sums = results[0];
        const sortedSums = Object.entries(sums)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10);

        const response = sortedSums.map(([keyword, sum]) => ({ keyword, sum }));
        res.json(response);
      });
    });
  });

  router.get('/kol-trials-distribution', (req, res) => {
    const query = `
      SELECT \`Key topic Trials Count\`, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY \`Key topic Trials Count\`
      ORDER BY  \`Key topic Trials Count\` 
     
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  router.get('/kol-conference-distribution', (req, res) => {
    const query = `
      SELECT \`Key topic Congress Count\`, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY \`Key topic Congress Count\`
      ORDER BY \`Key topic Congress Count\` ASC;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  router.get('/kol-publication-distribution', (req, res) => {
    const query = `
      SELECT \`Key topic Pubs Count\`, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY \`Key topic Pubs Count\`
      ORDER BY \`Key topic Pubs Count\` ASC;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  router.get('/kol-association-distribution', (req, res) => {
    const query = `
      SELECT \`ASSOCIATION Count\`, COUNT(DISTINCT \`KOL ID\`) AS KOL_Count
      FROM ranking_sheet
      GROUP BY \`ASSOCIATION Count\`
      ORDER BY \`ASSOCIATION Count\` ASC;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
  });

  return router;
};
