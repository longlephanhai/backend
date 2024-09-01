const userModel = require("../../models/userModal");

const listFriends = async (req, res) => {
  try {
    const myuserId = req.userId;
    const myUser = await userModel.findOne({
      _id: myuserId,
    })
    const friendsLists = myUser.friendsLists;
    const friendsListsID = friendsLists.map(friend => friend.userId);

    const users = await userModel.find({
      _id: { $in: friendsListsID }
    }).select("id profilePic name statusOnline")
    // Chuyển đổi sang JavaScript object thuần và thêm thuộc tính roomChatId
    const usersWithRoomChatId = users.map(user => {
      const userObject = user.toObject(); // Chuyển đổi sang object thuần
      const info = friendsLists.find(item => item.userId == user.id);
      userObject.roomChatId = info.room_chat_id;
      return userObject;
    });
    res.json({
      data: usersWithRoomChatId,
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
module.exports = listFriends