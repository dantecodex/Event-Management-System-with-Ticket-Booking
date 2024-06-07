import express from "express"
import { createEvent } from "../controller/event_controller.js"

const eventRouter = express.Router()

eventRouter.route('/create').post(createEvent)

export default eventRouter
