import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, "Event name is a required field"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events"
    },
    quantity: {
        type: Number,
        required: [true, "Ticket quantity is a required field"]
    },
    price: {
        type: Number,
        required: [true, "Ticket price is a required field"]
    },
    purchaseDate: {
        type: Date,
        default: Date.now()
    },
    totalPrice: {
        type: Number,
    },
    location: {
        type: String,
        default: "Unknown"
    },
    date: {
        type: Date
    }
}, { timestamps: true })

const Ticket = mongoose.model('Tickets', ticketSchema)

export default Ticket