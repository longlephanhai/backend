const postModel = require('../../models/post')

const postList = async (req, res) => {
  try {
    const data = await postModel.find().sort({ createdAt: -1 })
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
module.exports = postList