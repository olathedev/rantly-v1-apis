const notFound = (req, res, next) => {
    const error = new Error(`Resource not found - ${req.originalUrl}`)

    next(error)
}


const finalErrorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 400 : res.statusCode

    let message = err.message

    res.status(statusCode).json({message})
    

}

module.exports = {notFound, finalErrorHandler}