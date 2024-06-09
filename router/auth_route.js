import express from "express"
import { createUser, loginUser, forgotUser, resetUser } from "../controller/user_controller.js"

const authRouter = express.Router()

authRouter.route('/signup').post(createUser)
authRouter.route('/login').post(loginUser)
authRouter.route('/forgot').post(forgotUser)
authRouter.route('/reset').post(resetUser)
authRouter.route('/logout').get((req, res) => {
    res.clearCookie("token").redirect("/")
})


export default authRouter