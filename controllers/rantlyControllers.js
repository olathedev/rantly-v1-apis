const Users = require('../models/userModel')
const Messages = require('../models/messageModel')
const {BadRequest} = require('../errors')


const addNewuser = async (req, res, next) => {

    const {firstname, lastname, username, password} = req.body
    
    try {
        if(!firstname || !lastname || !username || !password){
            throw new BadRequest("Fill out all fields")
        }

        const findusers = await Users.findOne({username})
        console.log(findusers)
        if(findusers) {
            throw new BadRequest("username taken")
        }

        const user = await Users.create({firstname, lastname, username, password})
        res.status(200).json({user})

    } catch (error) {
        next(error) 
    }

}

const checkUser = async (req, res, next) => {

    const {username} = req.params

    try {
        const user = await Users.findOne({username}).select('username')
        if(!user) throw new BadRequest("User not found")
        res.status(200).json({user})
    } catch (error) {
        next(error)
    }

}

const sendNewMessage = async (req, res, next) => {
    const {message} = req.body
    const {username} = req.params

    try {
        const findusers = await Users.findOne({username})
        if(!findusers) {
            throw new BadRequest("User not found")
        } 
        const result = await Messages.create({message, userId: findusers._id})
        console.log(result)
        
        res.status(200).json({message: result})
    } catch (error) {
        next(error)
    } 
}

const getMessages = async (req, res) => {
    const {username} = req.params
    try {
        const messages = await Messages.find({userId: username}).select('message createdAt')
        res.status(200).json({messages})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addNewuser,
    checkUser,
    sendNewMessage,
    getMessages
}