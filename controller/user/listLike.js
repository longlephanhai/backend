const likeProductModel = require("../../models/likeProduct");

const listLikeProduct = async (req, res) => {
  try {
    const { productId } = req?.body
    const currentUser = req?.body.userId
    const isProductAvailable = await likeProductModel.findOne({ productId, userId: currentUser });
    if (isProductAvailable) {
      return res.json({
        message: "Already exits in favourite list",
        success: false,
        error: true
      })
    }
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    }
    const newFavoriteProduct = new likeProductModel(payload)
    const saveProduct = await newFavoriteProduct.save()
    return res.json({
      data: saveProduct,
      message: "Product Added in Favourite list",
      success: true,
      error: false
    })
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false
    })
  }
}
module.exports = listLikeProduct