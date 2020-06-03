const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'quotes.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Quotes = require('./models/quotes.js')(sequelize);
db.models.User = require('./models/user.js')(sequelize);

module.exports = {db,sequelize};