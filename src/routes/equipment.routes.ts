const {Router} = require("express")
const router = Router()
const {validation} = require("./../middlewares/validator")
const {
    getEquipmentSchema, 
    postEquipmentSchema, 
    deleteEquipmentSchema, 
    patchEquipmentSchema
} = require("./../models/schemas/equipment-schema")
const {getAll, getOneById, createNew, updateItem, deleteItem} = require("./../controllers/equipment.controller")

router.get("/", validation(getEquipmentSchema), getAll)
router.post("/", validation(postEquipmentSchema), createNew)
router.get("/:equipmentId", validation(getEquipmentSchema), getOneById)
router.patch("/:equipmentId", validation(patchEquipmentSchema), updateItem)
router.delete("/:equipmentId", validation(deleteEquipmentSchema), deleteItem)
//router.get("/:id/requests")  // TODO
//router.get("/:id/weather") // TODO

module.exports = router