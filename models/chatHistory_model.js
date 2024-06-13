import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
}, { timestamps: true })

const chatHistory = mongoose.model("ChatHistories", chatHistorySchema)

export default chatHistory