const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lecturerSchema = new Schema({
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
  }
})

module.exports = mongoose.model('Lecturer', lecturerSchema)