import User from "../models/user_model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customErrorHandler.js";

const createUser = asyncErrorHandler(async (req, res) => {
    const user = await User.create(req.body)

    if (!user) {
        throw new CustomError("Failed to create user", 400)
    }
    res.json({
        status: "Success",
        message: `${user.name} has been created`
    })
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

    res.json({
        status: "Success",
        message: "Successfully logged in",
        user
    })
})

export { createUser, loginUser }