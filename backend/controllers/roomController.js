const ROOM = require('../models/roomModel')
const mongoose = require('mongoose')

const getRoom = async(req, res) => {
    const { id } = req.params
    try{
        const roomData = await ROOM.findById(id)
        res.status(200).json(roomData)
    } catch(error) {
        res.status(400).json({error:error.message})
    }
}

const createRoom = async (req, res) => {
    try {
        const createdRoom = await ROOM.create(req.body)
        res.status(200).json(createdRoom)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getRoom,
    createRoom,
}