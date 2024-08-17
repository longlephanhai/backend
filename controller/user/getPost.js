const postModel = require('../../models/post')

const getPost = async (req, res) => {
  try {
    const data = await postModel.find({accept:true}).sort({ createdAt: -1 })
    // console.log("data", data);
    res.json({
      data: data,
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
module.exports = getPost