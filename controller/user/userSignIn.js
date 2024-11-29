const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModal');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    } else if (user.isConfirmed === false) {
      throw new Error("Please confirm your email address");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

      const tokenOption = {
        httpOnly: true,
        sameSite: 'None', // Mặc định là 'Lax', có thể điều chỉnh cho phù hợp
        // secure:true
      };

      // Điều chỉnh điều kiện để chỉ đặt secure=true khi chạy trên HTTPS
      if (process.env.NODE_ENV === 'development') {
        tokenOption.secure = true;
      }

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false
      });

      await userModel.updateOne({ _id: user.id }, {
        statusOnline: "online"
      })

      _io.once('connection', (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", user.id)
      })

    } else {
      throw new Error("Please check Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
