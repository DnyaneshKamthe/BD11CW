const sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect : 'sqlite',
  storage : './employee-database.sqlite'
})

module.exports = { DataTypes : sq.DataTypes , sequelize }