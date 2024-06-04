import express from "express"
import { createUser, loginUser } from "../controller/user_controller.js"

const authRouter = express.Router()

authRouter.route('/signup').post(createUser)
authRouter.route('/login').post(loginUser)


export default authRouter