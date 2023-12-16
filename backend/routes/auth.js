const express = require('express')
const {
    login_post,
    signup_post,
    signout,
    user
} = require('../controllers/authController')

const router = express.Router()

// POST a new user
router.post('/signup', signup_post)

//Login a user
router.post('/login', login_post)

//Signout
router.get('/signout', signout)

//Check user
router.get('/user', user)

module.exports = router