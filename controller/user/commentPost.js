const CommentModel = require("../../models/comment");

const commetPost = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;
    const newComment = new CommentModel({ postId, userId, comment });
    await newComment.save();
    res.json({
      message: "Success",
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
module.exports = commetPost