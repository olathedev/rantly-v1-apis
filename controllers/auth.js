const User = require('../models/userModel')
const {StatusCodes, BAD_REQUEST} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const {BadRequest, UnAuthenticatedError} = require('../errors')

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
    const {username, password} = req.body
    try {
        if(!username || !password) {
            throw new BadRequest("Please provide a valid username and password")
        }

        const user = await User.findOne({ username })

        console.log(user);

        if(!user) {
            throw new UnAuthenticatedError("Invalid Credentials - username")
        }

        const isMatch = await User.comparePassword(password, user.password)

        if(!isMatch) {
            throw new UnAuthenticatedError("Invalid Credentials - password")
        }

        const token = User.createToken()
        res.status(StatusCodes.OK).json({user: {username: user.username}, token})
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}