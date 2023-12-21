const express = require('express')
const {
    getFacultySchedule,
    createFaculty
} = require('../controllers/facultyController')
const { requireAuth,requireAdminAuth,requireSuperUserAuth } = require('../middleware/auth')
const router = express.Router()

router.get("/:semId", getFacultySchedule)

router.post("/", createFaculty)

module.exports = router