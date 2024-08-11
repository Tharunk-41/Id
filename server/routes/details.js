const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Route to get KOL data
  router.get('/data', (req, res) => {
    const kolId = req.query.kolId;
    if (!kolId) {
      res.status(400).json({ error: 'KOL ID is required' });
      return;
    }

    const query = `SELECT * FROM ranking_sheet WHERE \`KOL ID\` = ?`;

    db.query(query, [kolId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch data from database' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'No data found for the KOL ID' });
        return;
      }

      const kolDetails = results[0];

      // Fetch additional details
      const eventsQuery = `SELECT COUNT(*) AS totalEvents FROM events_data WHERE \`KOL ID\` = ?`;
      const trialsQuery = `SELECT \`Trial Count\` AS totalTrials FROM pubs_trials WHERE \`KOL ID\` = ?`;
      const pubsQuery = `SELECT \`Total PMID Count\` AS totalPublications FROM pubs_trials WHERE \`KOL ID\` = ?`;

      db.query(eventsQuery, [kolId], (error, eventResults) => {
        if (error) {
          console.error('Error executing events query:', error);
          res.status(500).json({ error: 'Failed to fetch events data from database' });
          return;
        }

        db.query(trialsQuery, [kolId], (error, trialsResults) => {
          if (error) {
            console.error('Error executing trials query:', error);
            res.status(500).json({ error: 'Failed to fetch trials data from database' });
            return;
          }

          db.query(pubsQuery, [kolId], (error, pubsResults) => {
            if (error) {
              console.error('Error executing publications query:', error);
              res.status(500).json({ error: 'Failed to fetch publications data from database' });
              return;
            }

            res.json({
              ...kolDetails,
              totalEvents: eventResults[0].totalEvents,
              totalTrials: trialsResults.length > 0 ? trialsResults[0].totalTrials : 0,
              totalPublications: pubsResults.length > 0 ? pubsResults[0].totalPublications : 0
            });
          });
        });
      });
    });
  });

  // Route to get KOL events
  router.get('/allevents', (req, res) => {
    const kolId = req.query.kolId;
    if (!kolId) {
      res.status(400).json({ error: 'KOL ID is required' });
      return;
    }

    const query = `SELECT *, DATE_FORMAT(\`Participation Date\`, '%d/%m/%Y') as \`Start Date\` FROM events_data WHERE \`KOL ID\` = ? ORDER BY \`Participation Date\` DESC`;
    db.query(query, [kolId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch event data from database' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'No events found for the KOL ID' });
        return;
      }

      res.json(results);
    });
  });
  router.get('/events', (req, res) => {
    const kolId = req.query.kolId;
    if (!kolId) {
      res.status(400).json({ error: 'KOL ID is required' });
      return;
    }
  
    const query = `SELECT 
                     \`Conference Name\`, 
                      DATE_FORMAT(\`Participation Date\`, '%d/%m/%Y') as \`Start Date\`,
                     \`Event Country\`,
                     \`Session Name; Topic Title\` as \`Session Name\`,
                     \`Sponsor Name\`,
                     \`Role\`,
                     \`Event Start Date\`,
                     \`Event End Date\`,
                     \`Event Location\`,
                     \`Event City\`,
                     \`Event State\`,
                     \`Abstract\`,
                     \`Session Type\`
                   FROM events_data 
                   WHERE \`KOL ID\` = ? 
                   ORDER BY \`Participation Date\` DESC`;
  
    db.query(query, [kolId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch event data from database' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'No events found for the KOL ID' });
        return;
      }
  
      // Group the results by conference name and calculate session counts
      const conferenceMap = new Map();
  
      results.forEach(event => {
        const conferenceName = event['Conference Name'];
        const details = {
          participationDate: event['Start Date'],
          eventCountry: event['Event Country'],
          sessionName: event['Session Name'],
          sponsorName: event['Sponsor Name'],
          role: event['Role'],
          eventDetails: {
            startDate: event['Event Start Date'],
            endDate: event['Event End Date'],
            location: event['Event Location'],
            city: event['Event City'],
            state: event['Event State'],
            abstract: event['Abstract'],
            sessionType: event['Session Type'],
          }
        };
  
        if (conferenceMap.has(conferenceName)) {
          conferenceMap.get(conferenceName).push(details);
        } else {
          conferenceMap.set(conferenceName, [details]);
        }
      });
  
      const mergedData = Array.from(conferenceMap.entries()).map(([conferenceName, details], index) => ({
        id: `${conferenceName}-${index}`,
        slNo: index + 1,
        conferenceName,
        participationDate: details[0].participationDate,
        eventCountry: details[0].eventCountry,
        sessionCount: details.length,
        sessionNames: details.map(detail => detail.sessionName).join(', '),
        sponsorName: details[0].sponsorName,
        role: details[0].role,
        eventDetails: details,
      }));
  
      res.json(mergedData);
    });
  });
  

  router.get('/keywords', (req, res) => {
    const query = `SELECT keywords FROM Keywords`;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching keywords:', error);
        res.status(500).json({ error: 'Failed to fetch keywords from database' });
        return;
      }

      const keywords = results.map(row => row.keywords);
      res.json({ keywords });
    });
  });

  router.get('/associations/:kolid', (req, res) => {
    const { kolid } = req.params;
    const query = `
      SELECT 
        \`Board Member\`, 
        \`Chair Person\`, 
        \`Committee Member\`, 
        \`President\`, 
        \`Secretary\` 
      FROM \`Associations_Graph\`
      WHERE \`KOL ID\` = ?
    `;

    db.query(query, [kolid], (error, rows) => {
      if (error) {
        console.error('Error fetching association data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: 'No data found for the provided KOLID' });
      }
    });
  });

  router.get('/publications', (req, res) => {
    const kolId = req.query.kolId;
    if (!kolId) {
      res.status(400).json({ error: 'KOL ID is required' });
      return;
    }

    const query = `SELECT *, DATE_FORMAT(\`Date (DD/MM/YYYY)\`, '%d/%m/%Y') as \`Formatted Date (DD/MM/YYYY)\` FROM Pubs_Raw_Data WHERE \`KOL ID\` = ? ORDER BY \`Date (DD/MM/YYYY)\` DESC`;

    db.query(query, [kolId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch publication data from database' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'No publications found for the KOL ID' });
        return;
      }

      res.json(results);
    });
  });

  router.get('/trials', (req, res) => {
    const kolId = req.query.kolId;
    if (!kolId) {
      res.status(400).json({ error: 'KOL ID is required' });
      return;
    }
  
    const query = `SELECT *, DATE_FORMAT(\`Completion Date\`, '%d/%m/%Y') as \`Formatted Completion Date\` FROM CT_Raw_Data WHERE \`KOL ID\` = ? ORDER BY \`Completion Date\` DESC`;
  
    db.query(query, [kolId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch trial data from database' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'No trials found for the KOL ID' });
        return;
      }
  
      res.json(results);
    });
  });
  
  router.get('/associations', (req, res) => {
    const kolId = req.query.kolId;
    if (!kolId) {
      res.status(400).json({ error: 'KOL ID is required' });
      return;
    }
  
    const query = `
      SELECT 
        \`Organization Name\`,
        \`Organization_Type\`,
        \`Board Committee\`,
        \`Position Role\`,
        \`Start Date\`,
        \`End Date\`,
        \`Affiliation Type\`,
        \`Organization City\`,
        \`Organization State\`,
        \`Organization Country\`
      FROM 
        Associations_Data 
      WHERE 
        \`KOL ID\` = ? 
      ORDER BY 
        \`Start Date\` DESC`;
  
    db.query(query, [kolId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch association data from database' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'No associations found for the KOL ID' });
        return;
      }
  
      // Ensure Start Date and End Date are integers
      const formattedResults = results.map(result => ({
        ...result,
        'Start Date': parseInt(result['Start Date']),
        'End Date': parseInt(result['End Date'])
      }));
  
      res.json(formattedResults);
    });
  });  

  return router;
};
