const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  friendsLists: [
    {
      userId: String,
      room_chat_id: String
    }
  ],
  acceptFriends: Array, // những người gửi yêu cầu cho B
  requestFriends: Array, // những người B gửi yêu cầu
  statusOnline: String,
  password: String,
  googleId: String,
  profilePic: String,
  role: String,
  cartData: { type: Object, default: {} },
  confirmationToken: String,
  isConfirmed: {
    type: Boolean,
    default: false
  },
  uuid: {
    type: String,
    default: uuidv4()
  },
  codeExpired: Date
}, {
  timestamps: true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel