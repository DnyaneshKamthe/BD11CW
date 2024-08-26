let { DataTypes , sequelize } = require('../lib/index.js');

let post = sequelize.define('post',{
  name : DataTypes.TEXT,
  type : DataTypes.TEXT,
  origin : DataTypes.TEXT,
  calories : DataTypes.INTEGER,
  cooking_time : DataTypes.INTEGER
});


module.exports = { post };