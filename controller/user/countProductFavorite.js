const likeProductModel = require("../../models/likeProduct")

const countProductFavorite = async (req, res) => {
    try {
        const userId = req.userId
        const count = await likeProductModel.countDocuments({
            userId: userId
        })
        res.json({
            data: {
                count: count
            },
            message: "ok",
            error: false,
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
module.exports = countProductFavorite