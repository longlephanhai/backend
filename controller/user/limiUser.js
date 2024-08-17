const userModel = require("../../models/userModal")

const limitUser = async (req, res) => {
  try {
    const allUsers = await userModel.find().limit(4)
    res.json({
      message: "All User ",
      data: allUsers,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
module.exports = limitUser