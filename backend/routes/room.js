const express = require('express')
const {
    getRoom,
    createRoom
} = require('../controllers/roomController')

const router = express.Router()

router.get("/:id", getRoom)

router.post("/", createRoom)

module.exports = router