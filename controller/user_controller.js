import jwt from "jsonwebtoken";
import crypto from "crypto"

import User from "../models/user_model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customErrorHandler.js";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

const sendCookie = (token, res) => {
    res.clearCookie('token')

    const options = {
        maxAge: process.env.LOGIN_EXPIRES,
        httpOnly: true
    }
    if (process.env.ENVI === 'prod') {
        options.secure = true
    }

    res.cookie('token', token, options)
}

const createUser = asyncErrorHandler(async (req, res) => {
    const user = await User.create(req.body)

    if (!user) {
        throw new CustomError("Failed to create user", 400)
    }

    const token = generateToken(user._id)
    sendCookie(token, res)

    res.redirect(`/homepage/${user._id}`)

})

const loginUser = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError("Please provide user credential to login", 401)
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user || !(await user.comparePassword(user.password, password))) {
        throw new CustomError("Invalid user credential", 401)
    }
    const token = generateToken(user._id);
    sendCookie(token, res)

    res.redirect(`/homepage/${user._id}`)
})

const forgotUser = asyncErrorHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        throw new CustomError("Invalid email ID", 400)
    }

    const resetToken = await user.createResetToken()
    await user.save({ validateBeforeSave: false })

    const options = {
        email: user.email,
        subject: "Password Resest Token",
        message: `Click here to reset your password: ${req.protocol}://${req.get('host')}/reset-password/${resetToken}`
    }

    try {
        await sendEmail(options)
        res.send('Password reset link sent')
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetTokenExpires = undefined
        await user.save({ validateBeforeSave: false })
    }

})

const resetUser = asyncErrorHandler(async (req, res) => {
    const { resetToken, password, confirmPassword } = req.body
    const hashtoken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const user = await User.findOne({ passwordResetToken: hashtoken, passwordResetTokenExpires: { $gt: Date.now() } })

    if (!user) {
        throw new CustomError("Token invalid or expired", 400)
    }

    user.password = password
    user.confirmPassword = confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    await user.save()

    const loginToken = generateToken(user._id)
    sendCookie(loginToken, res)

    res.redirect('/authentication')
})

export { createUser, loginUser, forgotUser, resetUser }