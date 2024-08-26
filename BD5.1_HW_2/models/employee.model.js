const { DataTypes, sequelize } = require('../lib/index.js');

let employee = sequelize.define('employee', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  salary: DataTypes.INTEGER,
});

module.exports = { employee };