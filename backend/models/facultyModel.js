const mongoose = require('mongoose')
const LOAD = require('./loadModel')
const Schema = mongoose.Schema

const facultySchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  semester: {
    type: String, //The value here must be Semester Specific (Semester ID)
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

facultySchema.post('save', async function (doc) {
  try {
    await LOAD.create({ semester: doc.semester, faculty: doc._id })
  } catch (err) {
    console.log(err)
  }
})

facultySchema.statics.findAndGetLoad = async function (query) {
  try {
    console.log(query)
    let facultyData = await this.find(query);
    const loadData = await LOAD.find(query);
    const temp = []
    facultyData.forEach((faculty) => {
      loadData.forEach((load)=>{
        if(load.faculty == faculty._doc._id.toString()){
          temp.push({...faculty._doc,load :{...load._doc}})
        }
      })
    });
    return temp;
  } catch (error) {
    console.error(error);
    throw new Error('Error in findAndGetLoad function');
  }
}
module.exports = mongoose.model('Faculty', facultySchema)