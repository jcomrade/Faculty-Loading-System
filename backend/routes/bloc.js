const express = require('express')
const {
  getAllBlocs,
  getBloc,
  createBloc
} = require('../controllers/blocController')

const router = express.Router()

// GET all Blocs
router.get('/', getAllBlocs)

// GET a single Blocs
router.get('/:id', getBloc)

// POST a new workout
router.post('/', createBloc)


module.exports = router