const userModel = require("../../models/userModal")
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body

    const user = await userModel.findOne({ email }).sort({ createdAt: -1 })
    if (user) {
      if (user.googleId) {
        // throw new Error("This email is already registered with google. Please login with google.")
        const hashPassword = await bcrypt.hashSync(password, 10);
        const confirmationToken = crypto.randomBytes(32).toString('hex');
        await userModel.updateOne({ email }, { password: hashPassword, confirmationToken, isConfirmed: true })
        res.status(201).json({
          data: user,
          success: true,
          error: false,
          message: "Registered successfully!"
        })
      }
      throw new Error("Already user exits.")
    }
    if (!email) {
      throw new Error("Please provide email")
    }
    if (!password) {
      throw new Error("Please provide password")
    }
    if (!name) {
      throw new Error("Please provide name")
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong")
    }
    // Tạo token xác nhận
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const payload = {
      ...req.body,
      role: "USER",
      password: hashPassword,
      confirmationToken,
      isConfirmed: false,
      codeExpired: dayjs().add(5, 'minutes'),
    }
    const userData = new userModel(payload)
    const saveUser = await userData.save()
    // Gửi email xác nhận
    sendConfirmationEmail(saveUser);
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully! Please check your email to confirm your account."
    })
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

const sendConfirmationEmail = (user) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS_EMAIL,
    },
  });

  const mailOptions = {
    from: process.env.MAIL,
    to: user.email,
    subject: 'Registration Successful',
    html: `
        <p>Hello ${user.name},</p>
        <p>Please nhập mã sau để xác thực tài khoản :</p>
        <p>${user.uuid}</p>
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email', error);
    } else {
      console.log('Email sent', info.response);
    }
  });
};
module.exports = userSignUpController