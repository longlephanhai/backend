const userModel = require("../../models/userModal");

const acceptFriends = async (req, res) => {
  try {
    const myuserId = req.userId;
    const myUser = await userModel.findOne({
      _id: myuserId,
    })
    const acceptFriends = myUser.acceptFriends;

    const users = await userModel.find({
      _id: { $in: acceptFriends }
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
module.exports = acceptFriends