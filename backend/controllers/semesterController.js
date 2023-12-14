const SEMESTER = require('../models/semesterModel')
const SCHEDULE = require('../models/scheduleModel')
const COURSE = require('../models/courseModel')
const DEGREE_PROGRAM = require('../models/blocModel')
const FACULTY = require('../models/facultyModel')
const ROOM = require('../models/roomModel')
const {schedRawData} = require('../utils/getSchedRawData')
const mongoose = require('mongoose')

const createSemester = async (req, res) => {
    const { semesterType, AY, userId } = req.body
    try {
        const createdSemester = await SEMESTER.create({ semesterType, AY, modifiedBy: userId })
        res.status(200).json(createdSemester)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const copySemester = async (req, res) => {
    const { targetSemesterId, currentSemesterId } = req.body

    try {
        const semesterCopy = await SCHEDULE.find({ semester: targetSemesterId })
        const finalCopy = semesterCopy.map(({ course, section, weeklySchedule, room, lecturer, students }) => ({
            semester: currentSemesterId,
            course,
            section,
            weeklySchedule,
            room,
            lecturer,
            students,
        }))
        const newSemester = await SCHEDULE.insertMany(finalCopy)
        res.status(200).json(newSemester)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllSemester = async (req, res) => {

    try {
        const allSemester = await SEMESTER.find({},{_id:1,semesterType:1,AY:1})
        console.log(allSemester)
        res.status(200).send(allSemester)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getSemesterSchedules = async (req, res) => {
    const { id } = req.params

    try {
        const semesterSchedules = await SCHEDULE.find({ semester: id, isDeleted: false })
        const ScheduleData = await schedRawData(semesterSchedules)
        res.status(200).json(ScheduleData)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createSemester,
    getAllSemester,
    copySemester,
    getSemesterSchedules
}