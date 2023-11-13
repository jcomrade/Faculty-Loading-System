const mongoose = require('mongoose')

const Schema = mongoose.Schema

const degreeProgramSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  yearLevel: {
    type: Number,
    required: true
  },
  bloc: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('DegreeProgram', degreeProgramSchema)