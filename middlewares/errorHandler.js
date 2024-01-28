const {CustomApiError, NotFound} = require('../errors/')


const notFound = (req, res, next) => {
    const error = new NotFound(`Resource not found - ${req.originalUrl}`)
    next(error)
}


const finalErrorHandler = (err, req, res, next) => {

    if(err instanceof CustomApiError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    return res.status(statusCode).json({message})
    

}

module.exports = {notFound, finalErrorHandler}