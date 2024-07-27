const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://jigyasumakkxr:2VTC4eCSCfxFW3jJ@cluster0.e5vumlw.mongodb.net/payment-master")

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User=mongoose.model("User", userSchema)

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema)

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

const Review = mongoose.model("Review", reviewSchema)


module.exports={
    User,
    Account,
    Review
}



