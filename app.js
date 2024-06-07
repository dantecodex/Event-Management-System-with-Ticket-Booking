import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser";

import staticRouter from "./router/stactic_route.js";
import authRouter from "./router/auth_route.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static("public"))
app.set('view engine', 'ejs');




app.use('/', staticRouter)
app.use('/api/user', authRouter)

app.use('*', (req, res) => {
    res.render('page404')
})

app.use(globalErrorHandler)

export default app
