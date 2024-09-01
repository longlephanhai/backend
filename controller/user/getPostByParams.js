const postModel = require("../../models/post");

const getPostByParam = async (req, res) => {
  try {
    const data = await postModel.find({ userId: req.params.id })
    res.json({
      data: data,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = getPostByParam