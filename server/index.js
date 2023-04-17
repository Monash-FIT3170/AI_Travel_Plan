const express = require('express');

const app = express();


// random data in local host
app.get('/api/data', (req, res) => {
  const data = { name: 'John Doe', age: 30 };
  res.json(data);
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});