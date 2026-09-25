const express = require("express")
const app = express()
const {securityMiddleware} = require("./middlewares/securityMiddleWare")
const {errorHandler} = require("./middlewares/errorHandler-middleware")
const {cors} = require("cors")
import CorsOptions = require("cors")
const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(",")

app.use(securityMiddleware)
app.use(cors({
    origin: (
        origin: string | undefined, 
        callback: (err: Error | null, allow?: boolean) => void) => 
        {
        if (!origin) return callback(null, true)

        if (allowedOrigins?.includes(origin)) return callback(null, true)
            else return callback(new Error("Not allowed by CORS"))
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}))


app.use(errorHandler)

module.exports = app