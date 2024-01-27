const Users = require('../models/userModel')
const Messages = require('../models/messageModel')


const addNewuser = async (req, res, next) => {

    const {firstname, lastname, username} = req.body

    if(!firstname || !lastname || !username){
         return res.status(400).json("All fields are required")
    }
    
    try {

        const findusers = await Users.findOne({username})
        console.log(findusers)
        if(findusers) {
            return res.status(400).json("username taken, tryanother")
        } 
        const user = await Users.create({firstname,lastname, username})
        res.status(200).json({user})

    } catch (error) {
        next(error) 
    }

}

const getProfile = async (req, res) => {

    const {username} = req.params

    try {
        const user = await Users.findOne({username}).select('firstname lastname username')
        if(!user) return res.status(400).json({message: "Inavlid Profile link"})
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const sendNewMessage = async (req, res) => {
    const {message, hint} = req.body
    const {username} = req.params

    try {
        const messages = await Messages.create({message, hint, userId: username})
        const findusers = await Users.findOne({username})
        console.log(findusers)
        if(!findusers) {
            return res.status(400).json("invalid Message link")
        } 
        res.status(200).json({messages})
    } catch (error) {
        res.status(400).json({error: error.message})
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
    getProfile,
    sendNewMessage,
    getMessages
}