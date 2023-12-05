const express = require('express')
const {
    getSignup,
    postSignup,
    postLogin
} = require('../controllers/authController')

const router = express.Router()

// POST a new user
router.post('/', postSignup)


module.exports = router