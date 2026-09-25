import type e = require("express")
import type nodeHttp = require("node:http")
const {AppError} = require("./../errors/custom-errors")

module.exports.errorHandler = function (err: typeof AppError, req: e.Request, res: e.Response & nodeHttp.ServerResponse, next: e.NextFunction) {
    if (res.headersSent) return next(err) 

    const isOperational = err.isOperational === true || err.status < 500

    //TODO add logger

    const body: Record<string, any> = {
        type: `https://my-future-doc/problems/${err.code}`,
        title: isOperational ? err.message : "Внутрення ошибка сервера",
        instance: req.originalUrl,
        requestId: (req as any).id
    }

    if (err.details) body.errors= err.details

    res.status(err.status).type("application/problem+json").json(body)
}