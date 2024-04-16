const express = require('express');
const routes = require('./controllers/index');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
