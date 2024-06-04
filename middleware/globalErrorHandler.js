import CustomError from "../utils/customErrorHandler.js"

const devError = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error
    })
}

const duplicateKeyHandler = (error) => {
    return new CustomError(`There are already an ${Object.keys(error.keyValue)} with ${Object.values(error.keyValue)} exist`, 400)
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
        if (error.code === 11000)
            error = duplicateKeyHandler(error)
        prodError(error, res)
    }
}

export default globalErrorHandler