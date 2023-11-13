// const BLOC = require('../models/blocModel')
// const mongoose = require('mongoose')

// // get all workouts
// const getAllBlocs = async (req, res) => {
//   const allBlocs = await BLOC.find({})

//   res.status(200).json(allBlocs)
// }

// const getBloc = async (req, res) => {
//     const { id } = req.params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such Bloc'})
//     }

//     const bloc = await BLOC.findById(id)

//     if (!bloc) {
//         return res.status(404).json({error: 'No such BLOC'})
//       }
    
//       res.status(200).json(bloc)

// }

// // create a new workout
// const createBloc = async (req, res) => {
//     const {name, type} = req.body
  
//     let emptyFields = []
  
//     if (!name) {
//       emptyFields.push('name')
//     }
//     if (!type) {
//       emptyFields.push('type')
//     }
//     if (emptyFields.length > 0) {
//       return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
//     }
  
//     // add to the database
//     try {
//       const bloc = await BLOC.create({ name, type })
//       res.status(200).json(bloc)
//     } catch (error) {
//       res.status(400).json({ error: error.message })
//     }
//   }

// // // get a single workout
// // const getWorkout = async (req, res) => {
// //   const { id } = req.params

// //   if (!mongoose.Types.ObjectId.isValid(id)) {
// //     return res.status(404).json({error: 'No such workout'})
// //   }

// //   const workout = await Workout.findById(id)

// //   if (!workout) {
// //     return res.status(404).json({error: 'No such workout'})
// //   }

// //   res.status(200).json(workout)
// // }



// // // delete a workout
// // const deleteWorkout = async (req, res) => {
// //   const { id } = req.params

// //   if (!mongoose.Types.ObjectId.isValid(id)) {
// //     return res.status(400).json({error: 'No such workout'})
// //   }

// //   const workout = await Workout.findOneAndDelete({_id: id})

// //   if(!workout) {
// //     return res.status(400).json({error: 'No such workout'})
// //   }

// //   res.status(200).json(workout)
// // }

// // // update a workout
// // const updateWorkout = async (req, res) => {
// //   const { id } = req.params

// //   if (!mongoose.Types.ObjectId.isValid(id)) {
// //     return res.status(400).json({error: 'No such workout'})
// //   }

// //   const workout = await Workout.findOneAndUpdate({_id: id}, {
// //     ...req.body
// //   })

// //   if (!workout) {
// //     return res.status(400).json({error: 'No such workout'})
// //   }

// //   res.status(200).json(workout)
// // }

// module.exports = {
//   getAllBlocs,
//   getBloc,
//   createBloc
// }