const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Quotes extends Sequelize.Model {}
    Quotes.init({
      quote: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "quote"',
          },
          notEmpty: {
            msg: 'Please provide a value for "quote"',
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "author"',
          },
          notEmpty: {
            msg: 'Please provide a value for "author"',
          },
        },
      },
    }, { sequelize });
  
    return Quotes;
  };