const express = require('express')
const cors = require('cors')
var cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api", router)
const PORT = 8080 || process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB")
        console.log("server is running")
    })
})
