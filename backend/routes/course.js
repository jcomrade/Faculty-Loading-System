const express = require('express')
const {
  createCourse,
  updateCourse
} = require('../controllers/courseController')
const { requireAuth,requireAdminAuth,requireSuperUserAuth } = require('../middleware/auth')
const router = express.Router()

// POST a new course
router.post('/', createCourse)

// PATCH an existing course
router.patch('/:courseId', updateCourse)


module.exports = router

