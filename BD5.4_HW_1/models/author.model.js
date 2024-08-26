const { DataTypes, sequelize } = require('../lib/index.js');

const author = sequelize.define('author',{
  name : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  birthYear : {
    type : DataTypes.INTEGER,
    allowNull : false
  }
})

module.exports = { author };