const mongoose = require('mongoose')

const inforSchema = mongoose.Schema({
  userId: {
    type: String,
    ref: "user",
  },
  status: {
    type: String,
    default: ""
  },
  age: {
    type: Number,
  },
  live: {
    type: String
  },
  work: {
    type: String
  }
}, {
  timestamps: true
})

const inforModel = mongoose.model("infor", inforSchema)

module.exports = inforModel