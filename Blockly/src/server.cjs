const express = require('express');
const path = require('path');
const app = express();
const port = 3002;

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/tutorial', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'tutorial', 'index.html'));
});

app.get('/sandbox', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'sandbox', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});