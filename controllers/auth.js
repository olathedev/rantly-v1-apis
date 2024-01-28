const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')

const register = async(req, res, next) => {

    const {firstname, lastname, username, password} = req.body

    try {
        
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const userTemp = {firstname, lastname, username, password: hashedPassword}
    
        const user = await User.create({...userTemp})
        res.status(StatusCodes.CREATED).json({user})
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