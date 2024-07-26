const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({
            message : "User authentication fails"
        })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        if(decoded.userId){
            req.userId = decoded.userId
            next()
        }
        else{
            res.status(401).json({
                message : "User authentication fails"
            })
        }
    }catch(err){
        res.status(401).json({
            message : "User authentication fails"
        })
    }
}

module.exports={
    authMiddleware
}