const SEMESTER = require('../models/semesterModel')
const COURSE = require('../models/courseModel')
const DEGREE_PROGRAM = require('../models/degreeProgramModel')
const LECTURER = require('../models/lecturerModel')
const ROOM = require('../models/roomModel')
const SCHEDULE = require('../models/scheduleModel')
const { sectionPattern } = require('../models/sectionPattern')
const mongoose = require('mongoose')

const getSchedule = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { error: 'No such Schedule' }
  }
  const schedule = await SCHEDULE.findById(id)
  const semesterData = await SEMESTER.findById(schedule.semester)
  const courseData = await COURSE.findById(schedule.course)
  let roomData = "None";
  let lecturerData = "None";
  let studentsData = "None";
  if (schedule.room != "None") {
    roomData = await ROOM.findById(schedule.room)
  }
  if (schedule.lecturer != "None") {
    lecturerData = await LECTURER.findById(schedule.lecturer)
  }
  if (schedule.students.length != 0) {
    studentsData = await DEGREE_PROGRAM.find({ _id: { $in: schedule.students } })
  }
  const output = { semester: semesterData, course: courseData, room: roomData, lecturer: lecturerData, students: studentsData }
  res.status(200).json(output)
}

const createSchedule = async (req, res) => {
  const { course } = req.body
  let emptyFields = []
  if (!course) {
    emptyFields.push('course')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the neccessary fields for Schedule Creation', emptyFields })
  }

  // add to the database
  try {
    const createdSchedule = await SCHEDULE.create(req.body)
    res.status(200).json(createdSchedule)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


module.exports = {
  getSchedule,
  createSchedule
}