import Event from "../models/event_model.js"
import User from "../models/user_model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/customErrorHandler.js";

function formatDate(date) {
    return date.split('-').reverse().join('-')
}

const createEvent = asyncErrorHandler(async (req, res) => {
    const { userId, date, ...eventData } = req.body
    const event = await Event.create({
        ...eventData,
        // date: formatDate(date)
        date
    });
    if (!event) {
        throw new CustomError("Failed to create event", 400)
    }
    const user = await User.findByIdAndUpdate(userId, { $push: { createdEvents: event._id } }, { new: true })

    res.redirect(`/homepage/${user._id}`)
})

const deleteEvent = asyncErrorHandler(async (req, res) => {

    await Event.findByIdAndDelete(req.body.eventId)
    res.redirect(`/authentication`)

})

export { createEvent, deleteEvent }