const Users = require('../models/userModel')
const Messages = require('../models/messageModel')
const {createCustomError} = require('../errors/error-classes')


const addNewuser = async (req, res, next) => {

    const {firstname, lastname, username, password} = req.body
    
    try {
        if(!firstname || !lastname || !username || password){
            throw createCustomError("Fill out all fields", 400)
        }

        const findusers = await Users.findOne({username})
        console.log(findusers)
        if(findusers) {
            throw createCustomError("username taken", 400)
        } 
        res.status(200).json({user})

    } catch (error) {
        next(error) 
    }

}

const checkUser = async (req, res, next) => {

    const {username} = req.params

    try {
        const user = await Users.findOne({username}).select('username')
        if(!user) throw createCustomError("Invalid Profile Link", 404)
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
            throw createCustomError("User not found", 404)
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
        const messages = await Messages.find({userId: username}).select('message hint createdAt')
        res.status(200).json({messages})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    addNewuser,
    checkUser,
    sendNewMessage,
    getMessages
}