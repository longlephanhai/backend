const likeProductModel = require("../../models/likeProduct")

const deleteFavoriteProduct = async (req, res) => {
    try {
        const productId = req.body.productId
        const deleteProduct = await likeProductModel.deleteOne({ _id: productId });
        res.json({
            error: false,
            success: true,
            data: deleteProduct
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
module.exports = deleteFavoriteProduct