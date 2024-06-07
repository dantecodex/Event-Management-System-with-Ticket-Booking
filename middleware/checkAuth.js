import jwt from "jsonwebtoken"

import User from "../models/user_model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customErrorHandler.js";

const checkAuth = asyncErrorHandler(async (req, res, next) => {
    const testToken = req.cookies.token

    if (!testToken) {
        if (req.originalUrl.includes("/homepage")) {
            return res.redirect('/authentication')
        }
        else {
            return next()
        }
    }

    const decodedToken = jwt.verify(testToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.clearCookie('token')
        }
        return decoded
    })

    const user = await User.findById(decodedToken.id)
    if (!user) {
        res.clearCookie('token')
        throw new CustomError("Invalid token, Please login again", 401)
    }

    req.user = user
    if (req.originalUrl.includes("/authentication")) {
        res.redirect(`/homepage/${user._id}`)
    }
    next()
})

export default checkAuth