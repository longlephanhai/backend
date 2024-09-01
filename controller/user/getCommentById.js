const CommentModel = require("../../models/comment");

const getCommentById = async (req, res) => {
  try {
    const data = await CommentModel.find().populate("userId", "name profilePic")
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
module.exports = getCommentById;