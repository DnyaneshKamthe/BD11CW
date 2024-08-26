const { DataTypes, sequelize } = require('../lib/index.js');

const book = sequelize.define('book',{
  title  : {
    type : DataTypes.STRING,
  },
  gener : {
    type : DataTypes.STRING,
  },
  publicationYear : {
    type : DataTypes.INTEGER,
  }
})

module.exports = { book };
