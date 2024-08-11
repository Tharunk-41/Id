const express = require('express');
const cors = require('cors');
const db = require('./db'); // Assuming db.js is in the same directory
const homeRouter = require('./routes/home');
const detailRouter = require('./routes/details');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Pass the db pool to routes
app.use('/api', homeRouter(db));
app.use('/api', detailRouter(db));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
