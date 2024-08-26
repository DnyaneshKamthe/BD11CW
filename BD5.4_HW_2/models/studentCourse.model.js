const { DataTypes , sequelize } = require('../lib/index.js');

const studentCourse = sequelize.define('studentCourse',{
  studentId : {
    type : DataTypes.INTEGER,
    allowNull: false,
    references : {
      model : 'student',
      key : 'id'
    }
  },
  courseId : {
    type : DataTypes.INTEGER,
    allowNull: false,
    references : {
      model : 'course',
      key : 'id'
    }
  }
})

student.belongsToMany(course, {through : studentCourse})
course.belongsToMany(student, {through : studentCourse})

module.exports = { studentCourse };