const chatWithFriendModel = require("../../models/chatWithFriend");
const userModel = require("../../models/userModal");

const chatWithFriend = async (req, res) => {
  try {
    const roomChatId = req.params.roomChatId;
    const chats = await chatWithFriendModel.find({
      room_chat_id: roomChatId,
      deleted: false
    })
    const currentUser = req.userId
    const myUser = await userModel.findOne({
      _id: currentUser
    })
    const friendsLists = myUser.friendsLists;
    const userIdsToExclude = friendsLists.filter(friend => friend.room_chat_id === roomChatId);

    res.json({
      data: chats,
      friend: userIdsToExclude,
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
module.exports = chatWithFriend