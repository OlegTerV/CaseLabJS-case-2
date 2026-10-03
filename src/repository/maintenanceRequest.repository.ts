const maintReq = require("./../storage/maintenance-request-data")

module.exports.getAll = function (start: number, end: number) {
    const currentElements = maintReq.slice(start , end)
    return currentElements
}

module.exports.getElementsCount = function () {
    const count = maintReq.length
    return count
}

module.exports.getMaintReqById = function (itemId: string) {
    const currentItem = maintReq.find((element: any) => element.id === itemId)
    return currentItem
}

module.exports.addNew = function (item: any) {
    maintReq.push(item)
}

module.exports.deleteItem = function (item: any) {
    const itemIndex = maintReq.indexOf(item)
    if (itemIndex !== -1) maintReq.splice(itemIndex, 1)
}

module.exports.getAllRequestsForEquipment = function (equipmentId: string) {
    const allRequests = maintReq.filter((element: any) => element.equipmentId === equipmentId)
    return allRequests
}

module.exports.openRequestsForEquioment = function (equipmentId: string) {
    const openRequests = maintReq.filter((element: any) => 
        ((element.status === "new" || element.status === "in_progress") && (element.equipmentId === equipmentId)))
    return openRequests
}