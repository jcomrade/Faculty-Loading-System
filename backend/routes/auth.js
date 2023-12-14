const express = require('express')
const {
    login_post,
    signup_post,
    user
} = require('../controllers/authController')

const router = express.Router()

// POST a new user
router.post('/signup', signup_post)

//Login a user
router.post('/login', login_post)

//Check user
router.get('/user', user)

module.exports = router