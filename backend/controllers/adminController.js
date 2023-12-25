const USER = require('../models/userModel')


const getUserList = async(req, res) => {
    try{
        const userList = await USER.find({});
        console.log(userList)
        res.status(200).json(userList);

    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getUserList
}