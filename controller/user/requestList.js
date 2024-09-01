const userModel = require("../../models/userModal")

const requestList = async (req, res) => {
  try {
    const myuserId = req.userId;
    const request = await userModel.findOne({
      _id: myuserId,
    })
    const requestFriend = request.requestFriends;

    const users = await userModel.find({
      _id: { $in: requestFriend }
    }).select("id profilePic name")
    res.json({
      data: users,
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
module.exports = requestList