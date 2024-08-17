// const chatModel = require("../../models/chat");

// const chat = async (req, res) => {
//   try {
//     const { id, name, img } = req.body
//     _io.once('connection', (socket) => {
//       socket.on("client_send_message", async (content) => {
//         const chat = new chatModel({
//           userId: id,
//           content: content,
//           name: name,
//           profilePic: img
//         })
//         await chat.save()a
//         // lấy data trả ra giao diện
//         const chats = await chatModel.find()
//         console.log("chat", chats);
//         res.json({
//           chats: chats,
//           message: "success",
//           success: true,
//           error: false
//         })
//         // trả data về cho client
//         // _io.emit('server_return_message', {
//         //   userId: id,
//         //   content: content,
//         //   name: name,
//         //   profilePic: img
//         // })
//       })
//     });
//   } catch (error) {
//     res.json({
//       message: error.message,
//       success: false,
//       error: true
//     })
//   }
// }
// module.exports = chat