const SEMESTER = require('../models/semesterModel')
const COURSE = require('../models/courseModel')
const DEGREE_PROGRAM = require('../models/degreeProgramModel')
const LECTURER = require('../models/lecturerModel')
const ROOM = require('../models/roomModel')
const SCHEDULE = require('../models/scheduleModel')
const {sectionPattern} = require('../models/sectionPattern')
const {createScheduleData} = require('../utils/createData')
const mongoose = require('mongoose')


const createScheduleData = (data) => {
    const {
        course,
        section,
        semesterId,
        lecturer
    } = data
    let availableData = {}
    if(course){
        const createdCourse = COURSE.create(course)
        availableData.course = createdCourse
    }if(semester){
        availableData.semester = semesterId
    }if(lecturer){
        availableData.lectuer = LECTURER.create(lecturer)
    }if(section){
        const createdSection = sectionPattern(section.name, availableData.course.type, section.endTime)
        availableData.section = createdSection
    }
}