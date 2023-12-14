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
    },
    dateModified: {
      type: String,
      default: `${(new Date()).getMonth()}${(new Date()).getDate()}${(new Date()).getFullYear()}`,
    },
    modifiedBy:{
      type: String,
      required: true,
    },
    isLocked:{
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  })
  
  module.exports = mongoose.model('Semester', semesterSchema)