import Event from "../models/event_model.js"
import User from "../models/user_model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/customErrorHandler.js";

const createEvent = asyncErrorHandler(async (req, res) => {
    const { userId, ...eventData } = req.body
    console.log(req.body);
    const event = await Event.create(eventData);
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