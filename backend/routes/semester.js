const express = require('express')
const {
  createSemester,
  getAllSemester,
  copySemester,
  getSemesterInformation
} = require('../controllers/semesterController')
const { requireAuth,requireAdminAuth,requireSuperUserAuth } = require('../middleware/auth')
const router = express.Router()

// GET all Blocs
router.post('/', createSemester)

router.get('/', getAllSemester)

router.get('/:sem', getSemesterInformation)

router.post('/copy', copySemester)

module.exports = router

