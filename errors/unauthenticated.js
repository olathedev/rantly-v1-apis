const CustomApiError = require('./customError')
const {StatusCodes} = require('http-status-codes')

class UnAuthenticatedError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}


module.exports = UnAuthenticatedError