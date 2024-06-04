import express from "express"

const staticRouter = express.Router()

staticRouter.route('/').get((req, res) => {
    res.render('index')
})

staticRouter.route('/authentication').get((req, res) => {
    res.render("authentication")
})

staticRouter.route('/homepage').get((req, res) => {
    res.render("homepage")
})

export default staticRouter