const BLOC = require('../models/blocModel')
const SCHEDULE = require('../models/scheduleModel')
const { schedRawData } = require('../utils/getSchedRawData')
const mongoose = require('mongoose')

const getBloc = async(req, res) => {
    const { sem } = req.params
    const queries = req.query
    console.log(queries)
    try{
        const semesterScheds = await SCHEDULE.find({semester: sem})
        const BlocShed = (await schedRawData(semesterScheds)).filter(
            (sched) => {
                    return sched.students.some(bloc => 
                        bloc.yearLevel == queries.yearLevel &&
                        bloc.department == queries.department &&
                        bloc.bloc == queries.bloc 
                    )
            }
        )
        console.log(BlocShed)
        res.status(200).json(BlocShed)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getSemBlocs = async(req,res)=>{
    const {sem} = req.params
    try{
        const semBlocs = await BLOC.find({semester:sem})
        res.status(200).json(semBlocs)
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const createBloc = async (req, res) => {
    const {
        degreeProgram,
        yearLevel,
        bloc,
        department
    } = req.body
    const { sem } = req.params
    const emptyFields = []
    if (!degreeProgram) {
        emptyFields.push("Degree Program");
    }
    if(!bloc){
        emptyFields.push("Bloc Number")
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Invalid Fields : ${emptyFields.map((field) => field + " ")}` })
    }

    try {
        const createdBloc = await BLOC.create({...req.body, semester: sem})
        res.status(200).json(createdBloc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getSemBlocs,
    createBloc
}