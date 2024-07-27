const express = require("express")
const jwt=require("jsonwebtoken")
const { signupSchema } = require("./zod_schema/signup")
const { signinSchema } = require("./zod_schema/signin")
const { updateSchema } = require("./zod_schema/update")
const { User,Account, Review } = require("../db")
const { JWT_SECRET } = require("../config")
const { authMiddleware } = require("../middleware")
const { reviewSchema } = require("./zod_schema/review")

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.post("/signup",async (req,res) => {
    try {
        const body=req.body
        const { success } =signupSchema.safeParse(body)
        if(!success){
            res.status(400).json({
                message : "Email is incorrect / Password is less than 6 letters"
            })
            return 
        }
        const existingUser=await User.findOne({
            username:body.username
        })
        if(existingUser){
            res.status(409).json({
                message : "User already exists"
            })
            return 
        }
        const user=await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const userId=user._id
        await Account.create({
            userId,
            balance: parseFloat((1 + Math.random() * 10000).toFixed(2))
        })
        const token=jwt.sign({
            userId : user._id
        },JWT_SECRET)
        res.status(200).json({
            message : "User created successfully",
            userID:userId,
            token : token
        })
    }catch(err){
        res.status(500).json({
            message: "Server Error"
        })
    }
})

userRouter.post("/signin",async (req,res) => {
    try {
        const body=req.body
        const { success } =signinSchema.safeParse(body)
        if(!success){
            res.status(400).json({
                message : "Email is incorrect / Password is less than 6 letters"
            })
            return 
        }
        const user= await User.findOne({
            username:body.username,
            password:body.password
        })
        if(user){
            const token=jwt.sign({
                userId : user._id
            },JWT_SECRET)
            res.status(200).json({
                userID:user._id,
                name:user.firstName,
                token : token
            })
        }
        else {
            res.status(404).json({
                message : "User not found"
            })
        }
    }catch(err){
        res.status(500).json({
            message: "Server Error"
        })
    }
})

userRouter.put("/", authMiddleware ,async (req,res) => {
    const body=req.body
    const { success } = updateSchema.safeParse(body)
    if(!success){
        res.status(400).json({
            message: "Error while updating information"
        })
    }
    try {
        await User.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({
        message: "Updated successfully"
        })
    }catch(err){
        res.status(400).json({
            message: "Error while updating information"
        })
    }
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

userRouter.post("/review", authMiddleware, async (req,res) => {
    const body=req.body
    const { success } = reviewSchema.safeParse(body)
    if(!success){
        res.status(400).json({
            message: "Error while submitting review"
        })
    }
    try {
        await Review.create({
            userId: req.userId,
            review:req.body.review
        })
        res.status(200).json({
            message:"Review Submitted"
        })
    }catch(err){
        res.status(500).json({
            message: "Server Error"
        })
    }
})

module.exports = {
    userRouter
}