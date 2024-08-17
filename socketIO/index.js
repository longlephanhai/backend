const chatModel = require("../models/chat");
const setupSocketEvents = async (io) => {
  io.on('connection', (socket) => {
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

  });

};

module.exports = setupSocketEvents;