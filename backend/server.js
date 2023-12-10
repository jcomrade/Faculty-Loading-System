require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {requireAuth} = require('./middleware/auth') 
const courseRoutes = require('./routes/course')
const facultyRoutes = require('./routes/faculty')
const roomRoutes = require('./routes/room')
const blocRoutes = require('./routes/bloc')
const semesterRoutes = require('./routes/semester')
const scheduleRoutes = require('./routes/schedule')
const authRoutes = require('./routes/auth')
const summaryRoutes = require('./routes/summary')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/course', requireAuth, courseRoutes)
app.use('/api/semester', requireAuth, semesterRoutes)
app.use('/api/faculty', requireAuth,facultyRoutes)
app.use('/api/room', requireAuth, roomRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/signup', authRoutes)
app.use('/api/bloc', blocRoutes)
app.use('/api/summary', summaryRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 