const userModel = require("../../models/userModal");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email", email);
    const user = await userModel.findOne({ email })
    console.log("user", user);
    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.confirmationToken = resetToken;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS_EMAIL
      }
    });
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.MAIL,
      to: user.email,
      subject: 'Password Reset Request',
      // text: `Hi ${user.name},\n\nPlease click on the following link to reset your password:\n${resetURL}\n\nBest Regards,\nYour Company`,
      html: `
        <p>Hello ${user.name},</p>
        <p>Please <a href=${resetURL}>click here</a> to reset your password.</p>
        <p>Best Regards,<br>LTQ</p>
    `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Password reset email sent.',
      success:true,
      error: false
     });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = forgotPassword