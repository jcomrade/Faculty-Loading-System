const express = require('express')
const {
    getFacultySchedule,
    createFaculty
} = require('../controllers/facultyController')

const router = express.Router()

router.get("/:id", getFacultySchedule)

router.post("/", createFaculty)

module.exports = router