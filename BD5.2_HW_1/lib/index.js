let sq = require("sequelize")

let sequelize = new sq.Sequelize({
  dialect : "sqlite",
  storage : "post-database.sqlite"
})

module.exports = { DataTypes: sq.DataTypes, sequelize };