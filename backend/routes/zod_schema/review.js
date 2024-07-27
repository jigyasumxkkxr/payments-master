const zod = require("zod")

const reviewSchema=zod.object({
    review:zod.string()
})

module.exports = {
    reviewSchema
}