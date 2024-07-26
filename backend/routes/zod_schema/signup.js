const zod = require("zod")

const signupSchema=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6)
})

module.exports = {
    signupSchema
}