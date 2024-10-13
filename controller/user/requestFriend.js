const userModel = require("../../models/userModal");

const requestFriend = async (req, res) => {
  try {
    const userRequest = req.userId; //user gửi yêu cầu kb
    const userAccecpt = req.body._id; //user được gửi kb

    const requestUSer = await userModel.find({ _id: userRequest })
    const acceptUser = await userModel.find({ _id: userAccecpt });
  
    await requestUSer.requestFriends.push(userAccecpt);
  
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = requestFriend