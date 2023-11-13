const express = require('express')
const {
  getCourse,
  getAllCourse,
  createCourse,
  updateCourse
} = require('../controllers/courseController')

const router = express.Router()

// GET a single course
router.get('/:id', getCourse)

// GET all course
// router.get('/', getAllCourse)

// POST a new course
router.post('/', createCourse)

// PATCH an existing course
router.patch('/:id', updateCourse)


module.exports = router

