const express = require('express');
const routes = require('./controllers/index');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Howdy, World');
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
