const userModel = require("../../models/userModal");

const notFriend = async (req, res) => {
  try {
    const currentUser = req.userId
    const myUser = await userModel.findOne({
      _id: currentUser
    })
    const requestFriends = myUser.requestFriends
    const acceptFriends = myUser.acceptFriends;
    const friendsLists = myUser.friendsLists;
    const userIdsToExclude = friendsLists.map(friend => friend.userId);

    const users = await userModel.find({
      $and: [
        { _id: { $ne: currentUser } },
        { _id: { $nin: requestFriends } },
        { _id: { $nin: acceptFriends } },
        { _id: { $nin: userIdsToExclude } }
      ],
    })
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
module.exports = notFriend