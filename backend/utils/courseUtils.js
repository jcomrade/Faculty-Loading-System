const COURSE = require('../models/courseModel')
const mongoose = require('mongoose')

const getCourse = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {error: 'No such Course'}
    }

    const course = await COURSE.findById(id)

    if (!course) {
        return res.status(404).json({error: 'No such Course'})
      }
    
    res.status(200).json(course)
}