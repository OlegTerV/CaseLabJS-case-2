import type e = require("express")
const {getItemsList, getItemById, createItem, updateItemData, deleteItemData} = require("./../services/equipment-service")

function getAll (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const allItems = getItemsList()
        res.status(200).json(allItems)
    } catch (error) {
        next(error)
    }
}

function getOneById (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const itemId = (req as any).valid.params.data.equipmentId
        const result = getItemById(itemId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

function createNew (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqBody = (req as any).valid.body.data
        const result = createItem(reqBody)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

function updateItem (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqQuery = (req as any).valid.params.data.equipmentId
        const reqBody = (req as any).valid.body.data
        const result = updateItemData(reqBody, reqQuery)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

function deleteItem (req: e.Request, res: e.Response, next: e.NextFunction) {
    try {
        const reqQuery = (req as any).valid.params.data.equipmentId
        deleteItemData(reqQuery)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

module.exports = {getAll, getOneById, createNew, updateItem, deleteItem}