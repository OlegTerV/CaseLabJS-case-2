import type maintenanceRequest = require("../models/entities/maintenance-request");

const maintenanceRequestsStorage: maintenanceRequest.MaintenanceRequest[] = [
    {
        id: "2af219d7-4c9b-4128-a20c-1c3c49c7a628",
        equipmentId: "1b22e7a9-2d91-4a9a-ba1a-b4911737a318",
        title: "Починить лопасти",
        description: "Старые лопасти отслужили свой срок",
        priority: "medium",
        status: "new",
        createdAt: "2026-09-10T15:30:00.000Z",
        updatedAt: "2026-09-19T15:30:00.000Z"
    }
]

module.exports = maintenanceRequestsStorage