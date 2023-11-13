const express = require('express')
const {
    getSchedule,
    createSchedule
} = require('../controllers/scheduleController')

const router = express.Router()

router.get("/:id", getSchedule)

router.post("/", createSchedule)

module.exports = router