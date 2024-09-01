const chatModel = require("../models/chat");
const chatWithFriendModel = require("../models/chatWithFriend");
const RoomChatModel = require("../models/roomChat");
const userModel = require("../models/userModal");
const setupSocketEvents = async (io) => {
  io.on('connection', (socket) => {
    // chức năng gửi tin nhắn
    socket.on("client_send_message", async (content, image, id, name, img, touser) => {
      const chat = new chatModel({
        userId: id,
        content: content,
        image: image,
        name: name,
        profilePic: img,
        toUser: touser
      })
      await chat.save()
      // trả data ve client
      io.emit("server_return_message", chat)
    })

    // chức năng gửi typing
    socket.on("CLIENT_SEND_TYPYNG", (type, id, name, touser) => {
      const data = {
        userId: id,
        type: type,
        name: name,
        touser: touser
      }
      socket.broadcast.emit("SERVER_RETURN_TYPING", data)
    })

    // chức năng gửi yêu cầu kết bạn
    socket.on("CLIENT_ADD_FRIEND", async (userId, myUserId) => {

      // them id cua A vao accept cua B
      const user = await userModel.findOne({
        _id: userId,
        acceptFriends: myUserId
      })
      if (!user) {
        await userModel.updateOne({
          _id: userId,
        }, {
          $push: { acceptFriends: myUserId }
        })
      }


      //them id cua B vao request cua A
      const myId = await userModel.findOne({
        _id: myUserId,
        requestFriends: userId
      }, {})
      if (!myId) {
        await userModel.updateOne({
          _id: myUserId,
        }, {
          $push: { requestFriends: userId }
        })
      }

      // lấy độ dài acceptFriend của B và trả về cho B
      const infoUserB = await userModel.findOne({
        _id: userId
      })
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends
      })

      // lấy thông tin của A hiển thị trả về cho B
      const infoUserA = await userModel.findOne({
        _id: myUserId
      }).select("id name profilePic");
      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userId: userId,
        infoUserA: infoUserA
      })
    })

    // chức năng hủy yêu cầu kết bạn
    socket.on("CLIENT_CANCEL_FRIEND", async (userId, myUserId) => {
      // xoa id cua A trong accept cua B
      const user = await userModel.findOne({
        _id: userId,
        acceptFriends: myUserId
      })
      if (user) {
        await userModel.updateOne({
          _id: userId,
        }, {
          $pull: { acceptFriends: myUserId }
        })
      }

      //xoa id cua B trong request cua A
      const myId = await userModel.findOne({
        _id: myUserId,
        requestFriends: userId
      }, {})
      if (myId) {
        await userModel.updateOne({
          _id: myUserId,
        }, {
          $pull: { requestFriends: userId }
        })
      }

      // lấy độ dài acceptFriend của B và trả về cho B
      const infoUserB = await userModel.findOne({
        _id: userId
      })
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends
      })

      // lấy userId của A trả về cho B
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userId: userId,
        userIdA: myUserId
      })
    })

    // chức năng từ chối kết bạn
    socket.on("CLIENT_REFUSE_FRIEND", async (userId, myUserId) => {
      // xoa id cua A trong accept cua B
      const user = await userModel.findOne({
        _id: myUserId,
        acceptFriends: userId
      })
      if (user) {
        await userModel.updateOne({
          _id: myUserId,
        }, {
          $pull: { acceptFriends: userId }
        })
      }

      //xoa id cua B trong request cua A
      const myId = await userModel.findOne({
        _id: userId,
        requestFriends: myUserId
      }, {})
      if (myId) {
        await userModel.updateOne({
          _id: userId,
        }, {
          $pull: { requestFriends: myUserId }
        })
      }
    })

    // chức năng chấp nhận kết bạn
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId, myUserId) => {

      //thêm A vào friendList của B
      // xoa id cua A trong accept cua B
      const user = await userModel.findOne({
        _id: myUserId,
        acceptFriends: userId
      })
      const myId = await userModel.findOne({
        _id: userId,
        requestFriends: myUserId
      }, {})
      // Tạo phòng chat
      let roomChat;
      if (user && myId) {
        roomChat = new RoomChatModel({
          typeRoom: "friend",
          users: [
            {
              user_id: userId,
              role: "superAdmin"
            },
            {
              user_id: myUserId,
              role: "superAdmin"
            }
          ],
        })
        await roomChat.save()
      }


      if (user) {
        await userModel.updateOne({
          _id: myUserId,
        }, {
          $push: {
            friendsLists: {
              userId: userId,
              room_chat_id: roomChat.id
            }
          },
          $pull: { acceptFriends: userId }
        })
      }

      // thêm B vào friendList của A
      //xoa id cua B trong request cua A

      if (myId) {
        await userModel.updateOne({
          _id: userId,
        }, {
          $push: {
            friendsLists: {
              userId: myUserId,
              room_chat_id: roomChat.id
            }
          },
          $pull: { requestFriends: myUserId }
        })
      }
    })

    // chức năng nhắn tin theo roomchat
    socket.on("CLIENT_SEND_MESSAGE_WITH_FRIEND", async (data, myUserId, roomChatId) => {
      const chat = new chatWithFriendModel({
        user_id: myUserId,
        room_chat_id: roomChatId,
        content: data?.content,
        images: data?.images
      })
      await chat.save();
      // console.log("data",data);
      // console.log("myUserId",myUserId);
      // console.log("roomChatId",roomChatId);
      // trả về tin nhắn cho client
      io.emit("SERVER_RETURN_MESSAGE_FRIEND", {
        user_id: myUserId,
        room_chat_id: roomChatId,
        content: data?.content,
        images: data?.images
      })
    })

    // chức năng gửi typing với friend
    socket.on("CLIENT_SEND_TYPYNG_FRIEND", (type, id, roomChatId) => {
      const data = {
        userId: id,
        type: type,
        roomChatId: roomChatId
      }
      socket.broadcast.emit("SERVER_RETURN_TYPING_FRIEND", data)
    })
  });

};

module.exports = setupSocketEvents;