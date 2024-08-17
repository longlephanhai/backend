const postModel = require("../../models/post");

const post = async (req, res) => {
  try {
    const newData = new postModel(req.body)
    await newData.save()
    res.json({
      message: "Posted successfully",
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
module.exports = post