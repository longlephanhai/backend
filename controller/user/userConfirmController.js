const userModel = require("../../models/userModal");
async function userConfirmController(req, res) {
  try {
    const { token } = req.params;
    const user = await userModel.findOne({ confirmationToken: token });
    if (!user) {
      throw new Error("Invalid token.");
    }
    user.isConfirmed = true;
    user.confirmationToken = undefined;
    await user.save();
    res.status(200).json({
      message: "Account confirmed successfully!",
      success: true,
      error: false
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userConfirmController;
