const postModel = require("../../models/post");

const postModal = async (req, res) => {
  try {
    const { id } = req.body
    const data = await postModel.findById(id)
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
module.exports = postModal