const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    img: { type: String },
    video: { type: String },
    desc: { type: String },
    like: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    accept: { type: Boolean, default: false },
    userLike: [{
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
    }]
}, {
    timestamps: true
})
const postModel = mongoose.model("post", postSchema)
module.exports = postModel