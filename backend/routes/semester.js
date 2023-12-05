const express = require('express')
const {
  createSemester,
  getAllSemester,
  copySemester,
  getSemesterSchedules
} = require('../controllers/semesterController')

const router = express.Router()

// GET all Blocs
router.post('/', createSemester)

router.get('/', getAllSemester)

router.get('/:id', getSemesterSchedules)

router.post('/copy', copySemester)

module.exports = router

