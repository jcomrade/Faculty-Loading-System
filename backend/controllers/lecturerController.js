const LECTURER = require('../models/lecturerModel')
const mongoose = require('mongoose')

const getLecturer = async(req, res) => {
    const { id } = req.params
    try{
        const lecturerData = await LECTURER.findById(id)
        res.status(200).json(lecturerData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createLecturer = async (req, res) => {
    try {
        const createdLecturer = await LECTURER.create(req.body)
        res.status(200).json(createdLecturer)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getLecturer,
    createLecturer
}