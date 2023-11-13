require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const courseRoutes = require('./routes/course')
const degreeProgramRoutes = require('./routes/degreeProgram')
const lecturerRoutes = require('./routes/lecturer')
const roomRoutes = require('./routes/room')
// const scheduleRoutes = require('./routes/schedule')
const semesterRoutes = require('./routes/semester')
const scheduleRoutes = require('./routes/schedule')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/course', courseRoutes)
app.use('/api/semester', semesterRoutes)
app.use('/api/lecturer', lecturerRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/degreeProgram', degreeProgramRoutes)
app.use('/api/schedule', scheduleRoutes)

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