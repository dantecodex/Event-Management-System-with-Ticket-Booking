import mongoose from "mongoose";
import "dotenv/config"

import app from "./app.js";

mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("DB Connection successfull");
    })
    .catch(error => {
        console.log("Failed to Connect with DB", error);
    })

app.listen(process.env.PORT, () => {
    console.log(`Local server has been started on http://localhost:${process.env.PORT}`);
})
