const SEMESTER = require('../models/semesterModel')
const SCHEDULE = require('../models/scheduleModel')
const COURSE = require('../models/courseModel')
const DEGREE_PROGRAM = require('../models/degreeProgramModel')
const BLOC = require('../models/blocModel')
const FACULTY = require('../models/facultyModel')
const ROOM = require('../models/roomModel')
const USER = require('../models/userModel')
const { schedRawData } = require('../utils/getSchedRawData')
const mongoose = require('mongoose')
const LOAD = require('../models/loadModel')


const createSemester = async (req, res) => {
    const { semesterType, AY, userId } = req.body
    try {
        const createdSemester = await SEMESTER.create({ semesterType, AY, modifiedBy: userId })
        const Username = await USER.findById({ _id: userId }, { userName: 1 })
        createdSemester.modifiedBy = Username.userName
        res.status(200).json(createdSemester)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const copySemester = async (req, res) => {
    const { targetSemesterId, currentSemesterId } = req.body

    try {
        const semesterCopy = await SCHEDULE.find({ semester: targetSemesterId })
        const finalCopy = await Promise.all(semesterCopy.map(async ({ course, section, weeklySchedule, room, faculty, students }) => {
            let courseCopy = await COURSE.findOne({ _id: course }, { _id: 0 });
            courseCopy.semester = currentSemesterId
            const newCourse = await COURSE.create(courseCopy.toObject())
            console.log(newCourse)
            let loadcopy = await LOAD.findOne({ faculty: faculty, semester: targetSemesterId }, { _id: 0 })
            loadcopy.semester = currentSemesterId
            const newcopy = await LOAD.create(loadcopy.toObject())
            return {
                semester: currentSemesterId,
                course: (newCourse._id).toString(),
                section,
                weeklySchedule,
                room,
                faculty,
                students,
            }
        }))
        const newSemester = await SCHEDULE.insertMany(finalCopy)
        res.status(200).json(newSemester)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllSemester = async (req, res) => {

    try {
        const allSemester = await SEMESTER.find({}, { _id: 1, semesterType: 1, AY: 1, modifiedBy: 1, dateModified: 1 })
        const semData = await Promise.all(allSemester.map(
            async (sem) => {
                try {
                    const userName = await USER.findById(sem.modifiedBy, { userName: 1, _id: 0 })
                    sem.modifiedBy = userName.userName
                    return sem
                } catch (err) {
                    return sem
                }
            }
        ))
        res.status(200).send(semData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getSemesterInformation = async (req, res) => {
    const { sem } = req.params
    const schedules = [],
        courses = [],
        rooms = [],
        faculties = [],
        blocs = [],
        degreePrograms = [];
    try {
        const semesterSchedules = await SCHEDULE.find({ semester: sem, isDeleted: false })
        const ScheduleData = await schedRawData(semesterSchedules)
        schedules.push(...ScheduleData)

        const semesterRooms = await ROOM.find({semester: sem})
        rooms.push(...semesterRooms)

        const semesterCourses = await COURSE.find({semester:sem})
        courses.push(...semesterCourses)

        const semesterFaculty = await FACULTY.findAndGetLoad({semester: sem})
        faculties.push(...semesterFaculty)

        const semesterBloc = await BLOC.find({semester:sem})
        blocs.push(...semesterBloc)

        const semesterDegreePrograms = await DEGREE_PROGRAM.find({semester:sem})
        degreePrograms.push(...semesterDegreePrograms)
        
        res.status(200).json({schedules,courses,rooms,faculties,blocs,degreePrograms})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createSemester,
    getAllSemester,
    copySemester,
    getSemesterInformation
}