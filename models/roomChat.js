const mongoose = require('mongoose')

const roomChatSchema = mongoose.Schema(
  {
    title: String,
    avatar: String,
    typeRoom: String,
    status: String,
    users: [
      {
        user_id: String,
        role: String,
      }
    ],
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
)

const RoomChatModel = mongoose.model("roomChat", roomChatSchema)

module.exports = RoomChatModel