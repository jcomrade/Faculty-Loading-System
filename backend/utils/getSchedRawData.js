const COURSE = require('../models/courseModel')
const DEGREE_PROGRAM = require('../models/blocModel')
const FACULTY = require('../models/facultyModel')
const ROOM = require('../models/roomModel')
const schedRawData = async (sched) => {
    let courseData = "None";
    let roomData = "None";
    let facultyData = "None";
    let studentsData = "None";
    const schedData = await Promise.all(sched
        .map(async ({ course, section, weeklySchedule, room, faculty, students }) => {
            try {
                courseData = await COURSE.findOne({ _id: course, isDeleted: false })
            } catch (error) {
                courseData = null
            }
            if (room != "None") {
                try {
                    roomData = await ROOM.findOne({ _id: room, isDeleted: false })
                } catch (error) {
                    roomData = null
                }
            }
            if (faculty != "None") {
                try {
                    facultyData = await FACULTY.findOne({ _id: faculty, isDeleted: false })
                } catch (error) {
                    facultyData = null
                }
            }
            if (students.length != 0) {
                try {
                    studentsData = await DEGREE_PROGRAM.find({ _id: { $in: students }, isDeleted: false })
                } catch (error) {
                    studentsData = null
                }
            }
            const output = { course: courseData, room: roomData, faculty: facultyData, students: studentsData, schedule: weeklySchedule, section: section }
            return output
        }))
    return schedData
}

module.exports = {
    schedRawData
}