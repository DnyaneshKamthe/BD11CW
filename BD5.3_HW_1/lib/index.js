const sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect : 'sqlite',
    storage : './BD5.3_HW_1/post-database.sqlite'
})

module.exports = { DataTypes : sq.DataTypes, sequelize }