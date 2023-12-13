const express = require('express')
const {
    getSchedule,
    createSchedule
} = require('../controllers/scheduleController')
const { requireAuth,requireAdminAuth,requireSuperUserAuth } = require('../middleware/auth')
const router = express.Router()

router.get("/:id", getSchedule)

router.post("/", createSchedule)

module.exports = router