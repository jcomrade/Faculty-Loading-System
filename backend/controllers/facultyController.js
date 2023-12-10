const FACULTY = require('../models/facultyModel')
const SCHEDULE = require('../models/scheduleModel')
const {schedRawData} = require('../utils/getSchedRawData')
const mongoose = require('mongoose')
const getFacultySchedule = async(req, res) => {
    const { id } = req.params
    try{
        const facultyData = await SCHEDULE.find({faculty: id, isDeleted: false})
        const schedData = await schedRawData(facultyData)
        res.status(200).json(schedData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createFaculty = async (req, res) => {
    try {
        const createdFaculty = await FACULTY.create(req.body)
        res.status(200).json(createdFaculty)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createFaculty,
    getFacultySchedule
}