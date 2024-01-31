const User = require('../models/userModel')
const {StatusCodes, BAD_REQUEST} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const {BadRequest, UnAuthenticatedError} = require('../errors')
const validate = require('../validators/user-validations')

const register = async(req, res, next) => {
    try {
        const {error} = validate(req.body)
        if(error) {
            throw new BadRequest(error)
        }
        const user = await User.create({...req.body})
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'

        })
        res.status(StatusCodes.CREATED).json({username: user.username, token})
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

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'

        })
        
        
        res.status(StatusCodes.OK).json({username: user.username, token})
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}