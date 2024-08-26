const { DataTypes, sequelize } = require('../lib/index.js');

const user = sequelize.define('user', {
    username: {
      type : DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    email: {
      type :  DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate : {
        isEmail: true
      }
    },
    password: {
      type : DataTypes.TEXT,
      allowNull: false,
    } 
})

module.exports = { user }