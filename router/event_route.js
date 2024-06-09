import express from "express"
import { createEvent, deleteEvent } from "../controller/event_controller.js"

const eventRouter = express.Router()

eventRouter.route('/create').post(createEvent)
eventRouter.route('/delete-event').post(deleteEvent)

export default eventRouter
