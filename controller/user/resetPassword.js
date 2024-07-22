const userModel = require("../../models/userModal");
const bcrypt = require('bcryptjs');
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await userModel.findOne({
      confirmationToken: token,
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired token.' 
      });
    }
    // Reset password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.status(200).json({ 
      message: 'Password reset successful.',
      success:true,
      error: false
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
       message: 'Server error.' 
      });
  }
}
module.exports = resetPassword