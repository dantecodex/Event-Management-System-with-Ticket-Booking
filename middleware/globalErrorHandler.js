import CustomError from "../utils/customErrorHandler.js"

const devError = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error
    })
}

const validationErrorHandler = (error) => {
    return new CustomError(`Invalid Input data: ${error.message}`, 400)
}


const duplicateKeyHandler = (error) => {
    return new CustomError(`There are already an ${Object.keys(error.keyValue)} with ${Object.values(error.keyValue)} exist`, 400)
}

const expiredJwtHandler = (err) => {
    return new CustomError('JWT token has expired, Please Login again', 401)
}

const invalidJwtHandler = (err) => {
    return new CustomError('Invalid Token, Please Login again', 401)

}

const prodError = (error, res) => {
    if (error.isOperational) {
        res.status(error.statusCode).send(error.message)
    }
    else {
        res.status(500).send("Something went wrong")
    }
}

const globalErrorHandler = (error, req, res, next) => {
    error.status = error.status || 'Unknown Error'
    error.statusCode = error.statusCode || 500

    if (process.env.ENVI === 'dev') {
        devError(error, res)
    }

    if (process.env.ENVI === 'prod') {
        if (error.name === 'ValidationError')
            error = validationErrorHandler(error)
        if (error.code === 11000)
            error = duplicateKeyHandler(error)
        if (error.name === 'TokenExpiredError')
            error = expiredJwtHandler(error)
        if (error.name === 'JsonWebTokenError')
            error = invalidJwtHandler(error)
        prodError(error, res)
    }
}

export default globalErrorHandler