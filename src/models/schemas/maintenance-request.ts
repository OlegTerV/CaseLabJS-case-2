const {z} = require("zod")

const bodySchema_post = z.strictObject({
    equipmentId: z.string(),
    title: z.string().min(5).max(120),
    description: z.string().max(2000),
    priority: z.enum(["low", "medium", "high", "critical"]),
    status: z.enum(["new", "in_progress", "done", "rejected"]).default("new"),
    plannedAt: z.string().optional
})

const bodySchema_patch = bodySchema_post.partial()

const paramsSchema = z.strictObject({
    maintenanceRequestId: z.string().giud()
})

const querySchema_get = z.strictObject({
    status: z.enum(["new", "in_progress", "done", "rejected"]).optional(),
    priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    equipmentId: z.string().optional(),
    plannedAt: z.string().optional(),
    sort: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(15),
})

const getMaintenanceRequestSchema = {
    params: paramsSchema.optional(),
    query: querySchema_get.optional(),
    body: z.undefined()
}

const postMaintenanceRequestSchema = {
    params: z.undefined(),
    query: z.undefined(),
    body: bodySchema_post
}

const deleteMaintenanceRequestSchema = {
    params: paramsSchema,
    query: z.undefined(),
    body: z.undefined()
}

const patchMaintenanceRequestSchema = {
    params: paramsSchema,
    query: z.undefined(),
    body: bodySchema_patch
}

module.exports = {
    getMaintenanceRequestSchema, 
    postMaintenanceRequestSchema, 
    deleteMaintenanceRequestSchema, 
    patchMaintenanceRequestSchema
}