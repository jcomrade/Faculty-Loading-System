const mongoose = require('mongoose')

const Schema = mongoose.Schema

const facultySchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  employeeId:{
    type: String,
    required: true,
  },
  onLeave: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Lecturer', facultySchema)