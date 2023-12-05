const express = require('express')
const {
  getSummary
} = require('../controllers/summaryController')

const router = express.Router()

// GET summary
router.get('/:id', getSummary)

module.exports = router

