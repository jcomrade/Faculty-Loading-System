const express = require('express')
const {
  getSummary
} = require('../controllers/summaryController')
const { requireAuth,requireAdminAuth,requireSuperUserAuth } = require('../middleware/auth')
const router = express.Router()

// GET summary
router.get('/:id', getSummary)

module.exports = router

