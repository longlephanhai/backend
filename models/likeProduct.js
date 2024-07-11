const mongoose = require('mongoose')

const likeProduct = mongoose.Schema({
    productId: {
        ref: 'product',
        type: String,
    },
    quantity: Number,
    userId: String,
}, {
    timestamps: true
})
const likeProductModel = mongoose.model("favorite", likeProduct)

module.exports = likeProductModel