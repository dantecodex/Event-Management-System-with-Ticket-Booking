import User from "../models/user_model.js";
import Event from "../models/event_model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customErrorHandler.js";
import Ticket from "../models/ticket_model.js";
import sendEmail from "../utils/sendEmail.js";

const paymentSucess = asyncErrorHandler(async (req, res) => {
    const { eventID, userID, ...ticketData } = req.body
    // const totalPrice = price * quantity

    const user = await User.findById(userID)
    const event = await Event.findById(eventID)
    if (!event) {
        throw new CustomError("Unable to find event for which Ticket is purchased for", 400)
    }
    // Is their already ticket purchased by user?
    const ticket = await Ticket.findOne({ user: userID, event: event._id, price: ticketData.price })

    if (ticket) {
        ticket.quantity += (ticketData.quantity * 1),
            ticket.totalPrice = ticket.price * ticket.quantity,
            await ticket.save()
    }
    else {
        await Ticket.create({
            user: userID,
            event: event._id,
            eventName: event.name,
            totalPrice: ticketData.price * ticketData.quantity,
            price: ticketData.price,
            quantity: ticketData.quantity,
            location: event.location,
            date: event.date
        })
    }
    event.participants += (ticketData.quantity * 1)
    await event.save()

    const options = {
        email: user.email,
        subject: "Ticket Confirmation",
        message: `Payment Successfull for Event '${event.name}'. <br>Total ticket purchased: ${ticketData.quantity}. <br>Total amount paid: $${ticketData.price * ticketData.quantity}`
    }

    try {
        await sendEmail(options)
    } catch (error) {
        throw new CustomError(error.message, 400)
    }


    res.status(200).redirect(`payment/payment-success/?id=${userID}`)
    // res.status(200).render("payment_success", { userID })

})

export { paymentSucess }