const likeProductModel = require("../../models/likeProduct")

const listLikeView = async (req, res) => {
  try {
    const currentUser = req.body.userId
    const allProduct = await likeProductModel.find({
      userId: currentUser
    }).populate("productId")
    res.json({
      data: allProduct,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error?.message || error,
      error: true,
      success: false
    })
  }
}
module.exports = listLikeView