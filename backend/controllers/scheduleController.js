const SEMESTER = require('../models/semesterModel')
const COURSE = require('../models/courseModel')
const DEGREE_PROGRAM = require('../models/blocModel')
const FACULTY = require('../models/facultyModel')
const ROOM = require('../models/roomModel')
const SCHEDULE = require('../models/scheduleModel')
const { sectionPattern } = require('../models/sectionPattern')
const mongoose = require('mongoose')
const LOAD = require('../models/loadModel')
const BLOC = require('../models/blocModel')
const { schedRawData } = require('../utils/getSchedRawData')


const getSchedule = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { error: 'No such Schedule' }
  }
  try {
    const schedule = await SCHEDULE.findById(id)
    const semesterData = await SEMESTER.findById(schedule.semester)
    const courseData = await COURSE.findById(schedule.course)
    let roomData = "None";
    let facultyData = "None";
    let studentsData = "None";
    if (schedule.room != "None") {
      roomData = await ROOM.findById(schedule.room)
    }
    if (schedule.faculty != "None") {
      facultyData = await FACULTY.findById(schedule.faculty)
    }
    if (schedule.students.length != 0) {
      studentsData = await DEGREE_PROGRAM.find({ _id: { $in: schedule.students } })
    }
    const output = { semester: semesterData, course: courseData, room: roomData, faculty: facultyData, students: studentsData }
    res.status(200).json(output)
  } catch (err) {
    console.log(err)
    res.status(400)
  }
}

const createSchedule = async (req, res) => {
  let {
    semester,
    course,
    section,
    weeklySchedule,
    room,
    faculty,
    students,
    newFaculty,
    newRoom,
    newBloc,
    newCourse
  } = req.body
  let emptyFields = []
  if (!course && !newCourse) {
    emptyFields.push('course')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the neccessary fields for Schedule Creation', emptyFields })
  }

  // add to the database
  try {
    if (newCourse) {
      const createdCourse = await COURSE.create({...newCourse, semester})
      course = createdCourse
    }
    if (newBloc) {
      newBloc = newBloc.map((bloc)=>{
        return {
          ...bloc,
          semester: semester,
        }
      })
      const createdBloc = await BLOC.insertMany(newBloc)
      const newBlocList = createdBloc.map((bloc) => { return bloc._id })
      if (students) {
        students = students.concat(newBlocList)
      } else {
        students = newBlocList
      }

    }
    if (newFaculty) {
      const courseUnits = await COURSE.findById(course._id);
      const facultyData = await FACULTY.create({ ...newFaculty, semester: semester});
      const createdLoad = await LOAD.create({semester: semester, faculty: (facultyData._id).toString()})
      faculty = facultyData._id
    }
    if (newRoom) {
      const roomData = await ROOM.create({...newRoom, semester: semester})
      room = roomData._id
    }
    const createdSchedule = await SCHEDULE.create({ semester, course: course._id ? course._id : course, section, weeklySchedule, room, faculty, students })
    res.status(200).json(await schedRawData([createdSchedule]))
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}


module.exports = {
  getSchedule,
  createSchedule
}