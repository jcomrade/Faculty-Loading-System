const DEGREE_PROGRAM = require('../models/degreeProgramModel')
const mongoose = require('mongoose')

const getDegreeProgram = async(req, res) => {
    const { id } = req.params
    try{
        const degreeProgramData = await DEGREE_PROGRAM.findById(id)
        res.status(200).json(degreeProgramData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createDegreeProgram = async (req, res) => {
    try {
        const createdDegreeProgram = await DEGREE_PROGRAM.create(req.body)
        res.status(200).json(createdDegreeProgram)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getDegreeProgram,
    createDegreeProgram
}