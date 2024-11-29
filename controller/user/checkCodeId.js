const dayjs = require('dayjs');
const userModel = require('../../models/userModal');
const checkCodeId = async (req, res) => {
  try {
    console.log(req.body);
    
    const user = await userModel.findOne({
      _id: req.body._id,
      uuid: req.body.code
    })
    if (!user) {
      throw new Error("Code không đúng hoặc đã hết hạn")
    }
    // check code hết hạn
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (!isBeforeCheck) {
      throw new Error("Code đã hết hạn")
    } else {
      await userModel.updateOne({
        _id: req.body._id
      }, {
        isConfirmed: true
      })
      res.status(200).json({
        message: "Code hợp lệ",
        success: true,
        error: false
      })
    }

  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    })
  }
}
module.exports = checkCodeId;