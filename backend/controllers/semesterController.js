const SEMESTER = require('../models/semesterModel')
const SCHEDULE = require('../models/scheduleModel')
const mongoose = require('mongoose')
const lecturerModel = require('../models/lecturerModel')

const createSemester = async (req, res) => {
    const {semesterType, AY} = req.body
    try {
        const createdSemester = await SEMESTER.create({semesterType,AY,courses:[],lecturers:[]})
        res.status(200).json(createdSemester)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getSemester = async(req, res) => {
    const {semesterId} = req.body

    try{
        const scheduleSummary = await SCHEDULE.find({semester:semesterId})
        res.status(200).json(scheduleSummary)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createSemester,
    getSemester
}