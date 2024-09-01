const userModel = require("../../models/userModal")

async function userLogout(req, res) {
  try {
    await userModel.updateOne({ _id: req.userId }, {
      statusOnline: "offline"
    })
    _io.once('connection', (socket) => {
      socket.broadcast.emit("SERVER_RETURN_USER_OFLINE", req.userId)
    })
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'development',
    })
    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: []
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    })
  }
}

module.exports = userLogout