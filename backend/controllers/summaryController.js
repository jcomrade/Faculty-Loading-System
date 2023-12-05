const FACULTY = require('../models/facultyModel')
const SCHEDULE = require('../models/scheduleModel')

const getSummary= async(req,res)=> {
    const { id } = req.params
    try{
        const summaryData= await SCHEDULE.distinct("faculty", {semester: id})
        const facultyLoad = await FACULTY.find({_id: { $in: summaryData}})
        res.status(200).json(facultyLoad)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getSummary
}