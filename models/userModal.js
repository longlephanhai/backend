const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
    role: String,
    cartData: { type: Object, default: {} }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel