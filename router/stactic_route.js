import express from "express"

import checkAuth from "../middleware/checkAuth.js"
import Event from "../models/event_model.js"
import User from "../models/user_model.js"
import Ticket from "../models/ticket_model.js"

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

staticRouter.route('/homepage/:userId').get(checkAuth, async (req, res) => {
    const user = req.user // through checkAuth
    const events = await Event.find({}).sort({ createdAt: -1 })
    res.render("homepage", { user, events })
})

staticRouter.route('/homepage/:userId/browse').get(checkAuth, async (req, res) => {
    const user = req.user // through checkAuth
    const events = await Event.find({}).sort({ createdAt: -1 })
    res.render("browse_event", { user, events })
})

staticRouter.route('/homepage/:userId/my-event').get(checkAuth, async (req, res) => {
    const user = await User.findById(req.user._id).populate({ path: 'createdEvents' })
    const events = user.createdEvents
    const tickets = await Ticket.find({ user: req.user._id })

    let groupedObjectByEventID = tickets.reduce((acc, obj) => {
        const eventID = obj.event.toString()
        if (!acc[eventID]) {
            acc[eventID] = []
        }
        acc[eventID].push(obj)
        return acc
    }, {})
    const groupedTickedByEventID = Object.values(groupedObjectByEventID)

    const combinedTicketValues = []
    groupedTickedByEventID.forEach(data => {
        const seperateCombinedValue = data.reduce((acc, obj) => {
            acc.eventName = obj.eventName
            acc.quantity += obj.quantity
            acc.totalPrice += obj.totalPrice
            acc.location = obj.location
            acc.date = obj.date.trim()
            return acc
        }, { quantity: 0, totalPrice: 0 })
        combinedTicketValues.push(seperateCombinedValue)
    })
    console.log(combinedTicketValues);

    res.render("my_event", { user, events, combinedTicketValues })
})

staticRouter.route('/homepage/:userId/create-event').get(checkAuth, async (req, res) => {
    const user = req.user
    res.render("create_event", { user })
})

staticRouter.route('/homepage/:userId/event/:eventId').get(checkAuth, async (req, res) => {
    const user = await User.findById(req.user._id).populate({ path: 'createdEvents' })
    const event = await Event.findOne({ _id: req.params.eventId })
    res.render("event_card", { user, event })
})

export default staticRouter