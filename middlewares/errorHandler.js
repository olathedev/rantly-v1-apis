const {CustomError} = require('../errors/error-classes')

const notFound = (req, res, next) => {
    res.status(404).json({msg: `Resource not found - ${req.originalUrl}`})
}


const finalErrorHandler = (err, req, res, next) => {

    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    return res.status(statusCode).json({message})
    

}

module.exports = {notFound, finalErrorHandler}