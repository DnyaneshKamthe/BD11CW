const sq = require('sequelize')

const sequelize = new sq.Sequelize({
  dialect : "sqlite",
  storage : "./BD5.4_HW_1/database.sqlite"
})

module.exports = { DataTypes : sq.DataTypes, sequelize }