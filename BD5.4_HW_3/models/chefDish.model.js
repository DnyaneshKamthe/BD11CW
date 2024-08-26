const { DataTypes, sequelize } = require('../lib/index.js');
const { chef } = require('./chef.model.js');

const chefDish = sequelize.define('chefDish',{
  chefId : {
    type : DataTypes.INTEGER,
    allowNull : false,
    references : {
      model : 'chef',
      key : 'id'
    }
  },
  dishId : {
    type : DataTypes.INTEGER,
    allowNull : false,
    references : {
      model : 'dish',
      key : 'id'
    }
  }
})

chef.belongsToMany(dish, {through : chefDish})
dish.belongsToMany(chef, {through : chef})

module.exports = { chefDish }