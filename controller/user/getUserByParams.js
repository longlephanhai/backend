const userModel = require("../../models/userModal");

const getUserByParams = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.params.id })
    res.json({
      data: user,
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
module.exports = getUserByParams