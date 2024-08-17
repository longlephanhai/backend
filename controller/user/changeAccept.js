const postModel = require("../../models/post");

const changeAccept = async (req, res) => {
  try {
    const { id } = req.params;
    const { accept } = req.body;
    let item = await postModel.findById(id);
    if (item) {
      item.accept = accept
      await item.save();
      res.send({
        data: item,
        success: true,
        error: false
      })
    }
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = changeAccept