import type equipment = require("../models/entities/equipment");

const equipmentsStorage: equipment.Equipment[] = [
    {
        id: "1b22e7a9-2d91-4a9a-ba1a-b4911737a318",
        name: "Вентилятор",
        type: "turbine",
        serialNumber: "ASD-123", //уникальный в пределах системы
        location: {
            lat: 12,
            lon: 32
        }, //{ lat: number, lon: number }
        status: "operational",
        installedAt: "2026-09-10T15:30:00.000Z"
    }]

module.exports = equipmentsStorage