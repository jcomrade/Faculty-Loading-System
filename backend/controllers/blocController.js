// const BLOC = require('../models/blocModel')
// const SCHEDULE = require('../models/scheduleModel')
// const { schedRawData } = require('../utils/getSchedRawData')
// const mongoose = require('mongoose')

// const getBloc = async(req, res) => {
//     const { id } = req.params
//     const { department, yearlevel } = req.query
//     try{
//         const semesterScheds = await SCHEDULE.find({semester: id})
//         const BlocShed = (await schedRawData(semesterScheds)).filter(
//             (sched) => {
//                 if(sched)
//             }
//         )
//         res.status(200).json(BlocShed)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// const createBloc = async (req, res) => {
//     try {
//         const createdBloc = await BLOC.create(req.body)
//         res.status(200).json(createdBloc)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

// module.exports = {
//     getBloc,
//     createBloc
// }