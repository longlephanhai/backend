const chatModel = require("../../models/chat")

const listMessage = async (req, res) => {
  try {
    const data = await chatModel.find({});
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
module.exports = listMessage