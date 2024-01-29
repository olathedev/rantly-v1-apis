const Users = require('../models/userModel')
const Messages = require('../models/messageModel')
const {BadRequest} = require('../errors')
const { StatusCodes } = require('http-status-codes')


const checkUser = async (req, res, next) => {
    const {username} = req.params
    try {
        const user = await Users.findOne({username}).select('username')
        if(!user) throw new BadRequest("User not found")
        res.status(StatusCodes.OK).json({user})
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
        
        res.status(StatusCodes.OK).json({message: result})
    } catch (error) {
        next(error)
    } 
}

const getMessages = async (req, res, next) => {
    const {userId} = req.user
    console.log(userId)
    try {
        const messages = await Messages.find({_id: userId})

        res.status(StatusCodes.OK).json({messages})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkUser,
    sendNewMessage,
    getMessages
}