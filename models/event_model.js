import mongoose, { mongo } from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name is a required field"],
        minlength: [3, "Event Name must be atleast three letters long"]
    },
    location: {
        type: String,
        required: [true, "Event location is a required field"],
        minlength: [6, "Event location must be atleast six letters long"]
    },
    date: {
        type: String,
        required: [true, "Event date is a required field"]
    },
    price: {
        type: Number,
        required: [true, "Event price is a required field"]
    },
    participants: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Event = mongoose.model('Events', eventSchema)

export default Event