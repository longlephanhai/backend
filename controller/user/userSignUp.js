const userModel = require("../../models/userModal")
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body

        const user = await userModel.findOne({ email })
        if (user) {
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
            isConfirmed: false
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
        <p>Please <a href="${process.env.FRONTEND_URL}/login">click here</a> to confirm your account.</p>
        <p>Best Regards,<br>LTQ</p>
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