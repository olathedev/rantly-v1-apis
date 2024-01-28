const User = require('../models/userModel')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

const register = async(req, res, next) => {

    
    try {
        
        const result = await User.create({...req.body})
        const token = User.createToken()
        res.status(StatusCodes.CREATED).json({user: {username: result.username, firstname: result.firstname}, token})
    } catch (error) {
        next(error)
    }
}

const login = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    register,
    login
}