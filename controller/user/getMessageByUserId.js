const chatModel = require("../../models/chat");
const userModel = require("../../models/userModal");

const getMessageByUserId = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log("id",id);

    const data1 = await chatModel.find({ userId: id })
    const data2 = await chatModel.find({ toUser: id })
    const profile = await userModel.findById(id)
    // console.log("data1",data1);
    // console.log("data2",data2);
    const data = data1.concat(data2);

    // Sắp xếp theo trường createdAt
    data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.json({
      data: data,
      profile: profile,
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
module.exports = getMessageByUserId