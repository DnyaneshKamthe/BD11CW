const sq = require('sequelize')

const sequelize = new sq.Sequelize({
  dialect : "sqlite",
  storage : "./BD5.5_CW/database.sqlite"
})

module.exports = { DataTypes : sq.DataTypes, sequelize }