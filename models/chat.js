const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
  userId: String,
  content: String,
  image:String,
  name: String,
  profilePic: String,
  toUser: {
    type: String,
    ref: 'user',
  }
}, {
  timestamps: true
}
)
const chatModel = mongoose.model("chat", chatSchema)
module.exports = chatModel