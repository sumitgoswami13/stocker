const express = require('express');
const db = require('../server/config/db.config'); // Adjust the path to your dbConfig file
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Quick Reads API!');
  });

  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });