const express = require("express");
const cors=require("cors")
const { router } = require("./routes");
const { userRouter } = require("./routes/user");

const app=express()

app.use(express.json())
app.use(cors())
app.use("/api/v1",router)


app.listen(3000)