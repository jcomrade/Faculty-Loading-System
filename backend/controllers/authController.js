const USER = require("../models/userModel");
const jwt = require('jsonwebtoken')
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { userName: '', password: '' };

  if(err.message === "Incorrect user name"){
    errors.userName = 'that user name is not registered';
  }

  if(err.message === "Incorrect password"){
    errors.password ='that password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.userName = 'that user name is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, userType) => {
  return jwt.sign({id, userType}, process.env.SECRET_KEY, {
    expiresIn: maxAge
  });
}

module.exports.signup_post = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await USER.create({ userName, password });
    const token = createToken(user._id, user.userType);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user: user._id, userType:user.userType});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { userName, password } = req.body;

  try{
    const user = await USER.login(userName, password);
    const token = createToken(user._id, user.userType);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id, userType:user.userType});
  }catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors});
  }
}