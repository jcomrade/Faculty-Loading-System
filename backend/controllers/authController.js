const USER = require('../models/userModel')

const handleErrors = (err) => {
    let errors = { name: "", email: "", password: "" };
    console.log(err)
    //duplication error
    if (err.code = 11000){
        errors.email = "that email is already registered"
        return errors
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

// const getSignup = (req, res) => {
//     res.stauts(200).json({ message: "test" })
// }

const postSignup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await USER.create({ name, email, password })
        res.status(201).json(user);
    }
    catch (err) {
        const error = handleErrors(err)
        res.status(400).send({errors:error})
    }
}

// const postLogin = async (req, res) => {
//     const { name, email, password } = req.body;

//     console.log(name, email, password);
//     res.send('user login');

// }

module.exports = {
    postSignup
}