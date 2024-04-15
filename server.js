const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/index');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Howdy, World');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database sucessfully');

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

app.use(routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
