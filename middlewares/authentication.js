const jwt = require('jsonwebtoken')
const {UnAuthenticatedError} = require('../errors')

const auth = async (req, res, next) => {
    const authheader = req.headers.authorization

    if(!authheader || !authheader.startsWith('Bearer ')) {
        throw new UnAuthenticatedError("Authentication invalid - No auth header provided or Bearer is not properly formated")
    }

    const token = authheader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload);
        req.userId = {userId: payload.userId}
        next()
    } catch (error) {
        throw new UnAuthenticatedError("Invalid Authentication")
    }
}


module.exports = auth


