const mongoose = require('mongoose')

const chatWithFriendSchema = mongoose.Schema({
  user_id: String,
  room_chat_id: String,
  content: String,
  images: Array,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
}
)
const chatWithFriendModel = mongoose.model("chatwithfriend", chatWithFriendSchema)
module.exports = chatWithFriendModel