const express = require('express')
const {
  createSemester
} = require('../controllers/semesterController')

const router = express.Router()

// GET all Blocs
router.post('/', createSemester)

module.exports = router

