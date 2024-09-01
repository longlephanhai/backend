const userModel = require("../../models/userModal")

const getOneFriend = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await userModel.findOne({ _id: userId }).select("name profilePic statusOnline")
    res.json({
      user: user,
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
module.exports = getOneFriend