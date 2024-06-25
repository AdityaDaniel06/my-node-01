const express = require('express');

const app = express();

// define routes
app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side.');
  res
    .status(200)
    .json({ message: 'Hello from the server side.', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('Sending Post request...');
});
// to start a server
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
