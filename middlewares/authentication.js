const jwt = require('jsonwebtoken')
const {UnAuthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const auth = async (req, res, next) => {
    const authheader = req.headers.authorization
    try {
        if(!authheader || !authheader.startsWith('Bearer ')) {
           return res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication invalid - No auth header provided or Bearer is not properly formated"})
        }

        const token = authheader.split(' ')[1]
        console.log(process.env.JWT_SECRET)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId}
        console.log(req.user)
        next()
    } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid Authentication"})
        
    }
}


module.exports = auth


