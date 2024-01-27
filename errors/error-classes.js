class CustomError extends Error {
    constructor(messgae, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}


const createCustomError = (msg, status) => {
    return new CustomError(msg, status)
}

module.exports = {
    CustomError,
    createCustomError
}