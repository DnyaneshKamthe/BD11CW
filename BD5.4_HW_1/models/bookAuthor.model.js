const { DataTypes, sequelize } = require('../lib/index.js');
const { author } = require('./author.model.js');
const { book } = require('./book.model.js');

const bookAuthor = sequelize.define('bookAuthor',{
  bookId : {
    type : DataTypes.INTEGER,
    allowNull: false,
    references : {
      model : 'book',
      key : 'id'
    }
  },
  authorId : {
    type : DataTypes.INTEGER,
    allowNull: false,
    references : {
      model : 'author',
      key : 'id'
    }
  }
})

book.belongsToMany(author, {through : bookAuthor})
author.belongsToMany(book, {through : bookAuthor})

module.exports = { bookAuthor };