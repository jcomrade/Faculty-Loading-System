const COURSE = require('../models/courseModel')
const SEMESTER = require('../models/semesterModel')
const mongoose = require('mongoose')


const createCourse = async (req, res) => {
  const {
    semester,
    name,
    code,
    type,
    units,
  } = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!code) {
    emptyFields.push('code')
  }
  if (!type) {
    emptyFields.push('type')
  }
  if (!units) {
    emptyFields.push('units')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the neccessary fields for Course Creation', emptyFields })
  }

  // add to the database
  try {
    const createdCourse = await COURSE.create({ name, code, type, units, semester })
    res.status(200).json(createdCourse)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const updateCourse = async (req, res) => {
  const { courseId } = req.params

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: 'No such Course' })
  }

  const updatedCourse = await COURSE.findByIdAndUpdate(id, {
    ...req.body
  })

  if (!updatedCourse) {
    return res.status(400).json({ error: 'No such Course' })
  }

  res.status(200).json(updatedCourse)
}

module.exports = {
  createCourse,
  updateCourse,
}