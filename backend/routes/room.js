const express = require('express')
const {
    createRoom
} = require('../controllers/roomController')
const { requireAuth,requireAdminAuth,requireSuperUserAuth } = require('../middleware/auth')
const router = express.Router()

router.post("/", createRoom)

module.exports = router