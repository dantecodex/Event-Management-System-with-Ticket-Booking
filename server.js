import mongoose from "mongoose";
import http from "http"
import { Server } from "socket.io";
import "dotenv/config"

import app from "./app.js";
import runSocketIO from "./utils/liveChat.js";

const server = http.createServer(app)
const io = new Server(server)

mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("DB Connection successfull");
    })
    .catch(error => {
        console.log("Failed to Connect with DB", error);
    })

server.listen(process.env.PORT, () => {
    console.log(`Local server has been started on http://localhost:${process.env.PORT}`);
})

runSocketIO(io)