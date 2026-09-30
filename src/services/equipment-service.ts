const equipmentsData = require("./../storage/equipments-data")
const {AppError} = require("./../errors/custom-errors")
const {v4} = require("uuid")


module.exports.getItemsList = function() {
    return equipmentsData
}

module.exports.getItemById = function(id: string) {
    let result = null
    equipmentsData.forEach((element: any) => {
        if (element.id == id) {result = element}
    });
    if (result) return result
    else throw new AppError(`Не существует элемента с id = ${id}`, {status:  404})
}

module.exports.createItem = function(itemData: any) {
    const userDate = new Date(itemData.installedAt)
    const dateNow = new Date()
    if (userDate > dateNow) throw new AppError(`Некорректная дата установки оборудования: ${userDate}`, {status: 400})
    let flagSerialNumber = false
    equipmentsData.forEach((element: any) => {
        if (itemData.serialNumber === element.serialNumber) flagSerialNumber = true
    });
    if (flagSerialNumber) throw new AppError(`Оборудование с сериныйм номером ${itemData.serialNumber} уже существует!`, {status: 409})

    let result = null
    const id = v4()
    const itemStore = {...itemData, id: id}
    equipmentsData.push(itemStore)
    return itemStore
}

module.exports.updateItemData = function (itemData: any, itemId: string) {
    if (itemData.installedAt) {
        const userDate = new Date(itemData.installedAt)
        const dateNow = new Date()
        if (userDate > dateNow) throw new AppError(`Некорректная дата установки оборудования: ${userDate}`, {status: 400})
    }

    const currentItem = equipmentsData.find((element: any) => element.id == itemId)

    if (!currentItem) throw new AppError(`Нет оборудования с id = ${itemId}`, {status: 404})

    let serialNumberFlag = false
    if (itemData.serialNumber) {
        if (currentItem.serialNumber != itemData.serialNumber) {
            serialNumberFlag = equipmentsData.some((element: any) => (element.serialNumber === itemData.serialNumber))
        }
    }
    
    if (serialNumberFlag) {
        throw new AppError(`Оборудование с серийым номером ${itemData.serialNumber} уже существует!`, {status: 409})
    }

    const newItem = {
        id: itemId,
        name: itemData.name || currentItem.name,
        type: itemData.type || currentItem.type,
        serialNumber: itemData.serialNumber || currentItem.serialNumber, //уникален
        location: itemData.location || currentItem.location,
        status: itemData.status || currentItem.status,
        installedAt: itemData.installedAt || currentItem.installedAt
    }
    
    const indexItem = equipmentsData.indexOf(currentItem)
    if (indexItem !== -1) equipmentsData.splice(indexItem, 1)
    equipmentsData.push(newItem)
    return newItem
}

module.exports.deleteItemData = function (itemId: string) {
    const currentItem = equipmentsData.find((element: any) => element.id === itemId)
    if (!currentItem) throw new AppError(`Нет оборудования с id = ${itemId}`, {status: 404})
    const elementIndex = equipmentsData.indexOf(currentItem)
    equipmentsData.splice(elementIndex, 1)
    return
}