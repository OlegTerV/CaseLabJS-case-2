const equipmentsData = require("./../storage/equipments-data")

module.exports.getAllElements = function (start: number, end: number) {
    const currentElements = equipmentsData.slice(start, end)
    return currentElements
}

module.exports.getElementsCount = function () {
    return equipmentsData.length
}

module.exports.getById = function (id: string) {
    let result
    equipmentsData.forEach((element: any) => {
        if (element.id == id) {result = element}
    });
    return result
}

module.exports.getBySerialNumber = function (serialNumber: string) {
    const result = equipmentsData.find((element: any) => element.serialNumber === serialNumber)
    return result
}

module.exports.addItem = function (item: any) {
    equipmentsData.push(item)
}

module.exports.deleteItem = function (item: any) {
    const indexItem = equipmentsData.indexOf(item)
    if (indexItem !== -1) equipmentsData.splice(indexItem, 1)
}