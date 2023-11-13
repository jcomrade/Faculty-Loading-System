const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scheduleSchema = new Schema({
  semester: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: false,
    default: "None"
  },
  weeklySchedule:{
    type: Array,
    required: false
  },
  room:{
    type: String,
    required: false,
    default: "None"
  },
  lecturer: {
    type: String,
    required: false,
    default: "None"
  },
  students: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Schedule', scheduleSchema)