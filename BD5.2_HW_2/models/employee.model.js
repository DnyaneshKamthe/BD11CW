let { DataTypes, sequelize } = require('../lib/index.js');

let employee = sequelize.define('employee',{
  name : DataTypes.TEXT,
  salary : DataTypes.INTEGER,
  department : DataTypes.TEXT,
  designation : DataTypes.TEXT,
})

module.exports = { employee }