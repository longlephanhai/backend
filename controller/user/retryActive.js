const userModel = require("../../models/userModal");
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const nodemailer = require('nodemailer');
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
        <p>Hello ${user.email},</p>
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
const retryActive = async (req, res) => {
  try {
    // check email
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        error: true,
        message: "Email không tồn tại",
      })
    }
    if (user.isConfirmed) {
      return res.json({
        success: false,
        error: true,
        message: "Tài khoản đã được kích hoạt",
      })
    }
    // send email
    const uuid = uuidv4();
    await userModel.updateOne({
      email: email
    }, {
      uuid: uuid,
      codeExpired: dayjs().add(5, 'minutes')
    })
    sendConfirmationEmail({ email, uuid });
    res.json({
      success: true,
      data: user,
      error: false,
      message: "Vui lòng kiểm tra email để xác nhận tài khoản",
    })

  } catch (error) {
    res.json({
      success: false,
      error: true,
      message: error.message,
    })
  }
}
module.exports = retryActive;