const CustomApiError = require('./customError')
const BadRequest = require('./bad-request')
const UnAuthenticatedError = require('./unauthenticated')
const NotFound = require('./not-found')


module.exports = {
    CustomApiError,
    BadRequest,
    UnAuthenticatedError,
    NotFound
}