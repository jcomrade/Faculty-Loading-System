const COURSE = require('../models/courseModel')
const FACULTY = require('../models/facultyModel')
const LOAD = require('../models/loadModel')
const SCHEDULE = require('../models/scheduleModel')

const getSummary = async (req, res) => {
    const { semId } = req.params
    try {
        const semesterSchedules = await SCHEDULE.find({ semester: semId })

        function getCoursesByFaculty(input) {
            const facultyMap = {};

            input.forEach(item => {
                const facultyId = item.faculty;
                const courseId = item.course;

                if (!facultyMap[facultyId]) {
                    facultyMap[facultyId] = [];
                }
                facultyMap[facultyId].push(courseId);
            });

            const result = [];

            for (const facultyId in facultyMap) {
                result.push({ faculty: facultyId, courses: facultyMap[facultyId] });
            }

            return result;
        }

        // Output array of objects with faculty id and courses specific to that faculty
        const outputArray = getCoursesByFaculty(semesterSchedules);
        console.log(outputArray)
        const facultyLoad = await Promise.all(outputArray.map(async({faculty, courses})=>{
            const courseSum = (await COURSE.find({_id:{$in:courses}},{_id:0,__v:0,name:0,code:0,type:0,isDeleted:0   })).reduce((acc, obj) => acc + obj.units, 0);
            const loadData = await LOAD.findOne({semester:semId, faculty: faculty})
            const facultyData = await FACULTY.findById(faculty)
            return {
                firstName: facultyData.firstName,
                lastName: facultyData.lastName,
                employeeId: facultyData.employeeId,
                TLC: courseSum,
                ALC: loadData.ALC,
                SLC: loadData.SLC,
                RLC: loadData.RLC
            }
        }))

        // console.log(semesterSchedules)
        res.status(200).json(facultyLoad)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getSummary
}