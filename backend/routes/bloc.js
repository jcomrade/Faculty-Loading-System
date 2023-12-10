const express = require('express')
const {
  getBloc,
  createBloc
} = require('../controllers/blocController')

const router = express.Router()

// // GET a single Bloc
router.get('/:id', getBloc)

// POST a Bloc
router.post('/', createBloc)


module.exports = router