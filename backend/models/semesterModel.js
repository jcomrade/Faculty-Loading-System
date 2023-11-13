const mongoose = require('mongoose')

const Schema = mongoose.Schema

const semesterSchema = new Schema({
    semesterType: {
      type: String,
      required: true
    },
    AY: {
      type: String,
      required: true
    }
  })
  
  module.exports = mongoose.model('Semester', semesterSchema)