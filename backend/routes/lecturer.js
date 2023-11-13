const express = require('express')
const {
    getLecturer,
    createLecturer
} = require('../controllers/lecturerController')

const router = express.Router()

router.get("/:id", getLecturer)

router.post("/", createLecturer)

module.exports = router