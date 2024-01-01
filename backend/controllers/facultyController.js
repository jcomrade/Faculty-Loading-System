const FACULTY = require('../models/facultyModel')
const SCHEDULE = require('../models/scheduleModel')
const {schedRawData} = require('../utils/getSchedRawData')
const mongoose = require('mongoose')
const getFacultySchedule = async(req, res) => {
    const { semId } = req.params
    const { facultyId } = req.body
    try{
        const facultyData = await SCHEDULE.find({faculty: facultyId, semester: semId,isDeleted: false})
        const schedData = await schedRawData(facultyData)
        res.status(200).json(schedData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getSemFaculty = async(req, res) => {
    const { semId } = req.params
    try{
        const facultyData = await FACULTY.find({semester: semId})
        console.log(facultyData)
        res.status(200).json(facultyData)
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
    getFacultySchedule,
    getSemFaculty
}