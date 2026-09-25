const express = require("express")
const app = express()
const {securityHeaders} = require("./middlewares/security-middleware")
const {errorHandler} = require("./middlewares/errorHandler-middleware")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const {NotFoundError} = require("./errors/custom-errors")
const logger = require("./middlewares/logger")
const {setRequestId} = require("./middlewares/set-request-id")
const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(",")
const limitter = rateLimit({
    windowMs: 15* 60 * 1000,
    max: 100
})
app.use(securityHeaders)
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
app.use(limitter)
app.use(express.json({limit: "100kb"}))
app.use(express.urlencoded({extended: true, limit: "100kb"}))
app.use(setRequestId)
//routes


app.use((req: any, res: any, next: any) => {
    next(new NotFoundError("Эндпоинт"))
})
app.use(errorHandler)

module.exports = app