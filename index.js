const express = require('express')
const cors = require('cors')
var cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const http = require('http');
const { Server } = require("socket.io");
const setupSocketEvents = require('./socketIO')


const app = express()
// socketIo
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
global._io = io
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api", router)
const PORT = 8080 || process.env.PORT
app.get("/", (req, res) => {
    res.send("API Working");
});
setupSocketEvents(io)
connectDB().then(() => {
    // app.listen(PORT, () => {
    //     console.log("connect to DB")
    //     console.log("server is running")
    // })
    server.listen(PORT, () => {
        console.log("server connect", PORT)
    })
})
