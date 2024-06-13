import express from "express"

import checkAuth from "../middleware/checkAuth.js"
import Event from "../models/event_model.js"
import User from "../models/user_model.js"
import Ticket from "../models/ticket_model.js"


function formatDate(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

const getFormattedEvents = async () => {
    const events = await Event.find({}).sort({ createdAt: -1 });
    return events.map(event => ({
        ...event.toObject(),
        date: formatDate(event.date)
    }));
};

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
    const events = await getFormattedEvents()
    res.render("homepage", { user, events })
})

staticRouter.route('/homepage/:userId/browse').get(checkAuth, async (req, res) => {
    const user = req.user // through checkAuth
    let events = await getFormattedEvents()
    res.render("browse_event", { user, events })
})

staticRouter.route('/homepage/:userId/my-event').get(checkAuth, async (req, res) => {
    const user = await User.findById(req.user._id).populate({ path: 'createdEvents' })
    // const events = user.createdEvents
    let events = user.createdEvents.map(event => event);
    events = events.map((obj) => {
        return {
            ...obj.toObject(),
            date: formatDate(obj.date)
        }
    })

    // console.log(test);
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

    let combinedTicketValues = []
    groupedTickedByEventID.forEach(data => {
        const seperateCombinedValue = data.reduce((acc, obj) => {
            acc._id = obj._id
            acc.eventID = obj.event
            acc.eventName = obj.eventName
            acc.quantity += obj.quantity
            acc.totalPrice += obj.totalPrice
            acc.location = obj.location
            // acc.date = obj.date.trim()
            acc.date = formatDate(obj.date)

            return acc
        }, { quantity: 0, totalPrice: 0 })
        combinedTicketValues.push(seperateCombinedValue)

    })
    res.render("my_event", { user, events, combinedTicketValues })
})

staticRouter.route('/homepage/:userId/my-event/:ticketID').get(checkAuth, async (req, res) => {
    const user = req.user
    const ticket = await Ticket.findById(req.params.ticketID)
    let event = await Event.findById(ticket.event)
    event = event.toObject()
    event.date = formatDate(event.date)

    res.render("ticket_card", { user, event, ticket })
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