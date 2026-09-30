import type e = require("express")
import winston = require("winston")

module.exports.healthCheck = function (req: e.Request, res: e.Response, next: e.NextFunction) {
    //TODO: проверить досутп к бд
    //TODO: проверить доступность внешних API (не надо)
    return res.status(200).json({accessibility: "Service is available"})//TODO статус, время работы, версия
}