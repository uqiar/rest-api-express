const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "name"',
          },
          notEmpty: {
            msg: 'Please provide a value for "name"',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Please provide a value for "email"',
          },
          notEmpty: {
            msg: 'Please provide a value for "email"',
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "password"',
          },
          notEmpty: {
            msg: 'Please provide a value for "password"',
          },
        },
      },
    }, { sequelize });
  
    return User;
  };