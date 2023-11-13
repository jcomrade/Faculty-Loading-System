const express = require('express')
const {
    getDegreeProgram,
    createDegreeProgram
} = require('../controllers/degreeProgramController')

const router = express.Router()

router.get("/:id", getDegreeProgram)

router.post("/", createDegreeProgram)

module.exports = router