const { DataTypes , sequelize } = require('../lib/index.js');

const student = sequelize.define('student', {
  name : {
    type : DataTypes.STRING,
    allowNull : false
  },
  age : {
    type : DataTypes.INTEGER,
    allowNull : false
  }
})

module.exports = { student }