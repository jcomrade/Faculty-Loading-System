const express = require('express')
const {
    getFacultySchedule,
    createFaculty,
    getSemFaculty
} = require('../controllers/facultyController')
const { requireAuth,requireAdminAuth,requireSuperUserAuth } = require('../middleware/auth')
const router = express.Router()

router.get("/:semId", getFacultySchedule)

router.get("/list/:semId", getSemFaculty)

router.post("/:sem", createFaculty)

module.exports = router