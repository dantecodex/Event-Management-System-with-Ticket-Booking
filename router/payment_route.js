import express from "express"
import { paymentSucess } from "../controller/payment_controller.js"
const paymentRouter = express.Router()

paymentRouter.route('/').post(paymentSucess)
paymentRouter.route('/payment-success').get((req, res) => {
    res.render("payment_success", { userID: req.query.id })
})


export default paymentRouter