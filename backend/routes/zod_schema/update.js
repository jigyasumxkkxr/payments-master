const zod = require("zod")

const updateSchema=zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().min(6).optional()
})

module.exports = {
    updateSchema
}