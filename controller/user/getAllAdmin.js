const userModel = require("../../models/userModal")

const getAllAmin = async (req, res) => {
  try {
    const data = await userModel.find({ role: "ADMIN" })
    res.json({
      data: data[3],
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
module.exports = getAllAmin