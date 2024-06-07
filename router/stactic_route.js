import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import Event from "../models/event_model.js"

const staticRouter = express.Router()

staticRouter.route('/').get((req, res) => {
    res.render('index')
})

staticRouter.route('/authentication').get(checkAuth, (req, res) => {
    res.render("authentication")
})

staticRouter.route('/forgot-password').get((req, res) => {
    res.render("forgot_password")
})

staticRouter.route('/reset-password/:resetToken').get((req, res) => {
    const resetToken = req.params.resetToken
    if (resetToken.length !== 64) {
        res.redirect('/')
    }
    res.render("reset_password", { resetToken })
})

staticRouter.route('/homepage/:id').get(checkAuth, async (req, res) => {
    const user = req.user
    const events = await Event.find({})
    res.render("homepage", { user, events })
})

staticRouter.route('/homepage/:id/event').get(checkAuth, async (req, res) => {
    res.render("event_card")
})

export default staticRouter