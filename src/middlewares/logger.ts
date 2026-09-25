import winston = require("winston")

const levels = {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = () => {
    const env = process.env.NODE_ENV || "dev"
    return env === "dev"? "debug" : "warning"
}

const colors = {
    error: "red",
    warning: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
}

winston.addColors(colors)

const consoleFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:ss:ms"}),
    winston.format.colorize({all: true}),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level} ${info.message}`
    )
)

const fileFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:ss:ms"}),
    winston.format.json()
)

const transport = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "./../../logs/error.log",
        level: "error"
    }),
    new winston.transports.File({filename: "./../../logs/all_logs.log"})
]

if (process.env.NODE_ENV !== "dev") {
    transport.push(
        new winston.transports.File({
            filename: "./../../logs/warns-and-errors.json",
            level: "warning",
            format: fileFormat
        })
    )
}

const logger = winston.createLogger({
    level: level(),
    levels: levels,
    format: consoleFormat,
    transports: transport
})

module.exports = logger