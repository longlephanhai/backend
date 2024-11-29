const verifyGoogleToken = require("../../helpers/verifyGoogleToken");
const userModel = require("../../models/userModal");
const jwt = require('jsonwebtoken');
const googleLogin = async (req, res) => {
  try {
    if (req.body.credential) {
      const verifyvstonResponse = await verifyGoogleToken(req.body.credential)
      if (verifyvstonResponse.error) {
        return res.json({
          message: verifyvstonResponse.error,
          success: false,
          error: true
        })
      }
      const profile = verifyvstonResponse?.payload
      // console.log(profile);
      // check user đã đăng kí local chưa
      const isExist = await userModel.findOne({ email: profile.email })
      if (isExist) {
        const tokenData = {
          _id: isExist._id,
          email: isExist.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
        const tokenOption = {
          httpOnly: true,
          sameSite: 'None',
        };
        if (process.env.NODE_ENV === 'development') {
          tokenOption.secure = true;
        }
        res.cookie("token", token, tokenOption).status(200).json({
          message: "Login successfully",
          data: token,
          success: true,
          error: false
        });

        await userModel.updateOne({ _id: isExist.id }, {
          statusOnline: "online"
        })
        _io.once('connection', (socket) => {
          socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", isExist.id)
        })
      } else {
        const newUser=new userModel({
          name: profile.name,
          email: profile.email,
          googleId: profile.sub,
          profilePic: profile.picture,
          statusOnline: "online",
          role: "USER",
        })
        const saveUser=await newUser.save()
        const tokenData = {
          _id: saveUser._id,
          email: saveUser.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
        const tokenOption = {
          httpOnly: true,
          sameSite: 'None',
        };
        if (process.env.NODE_ENV === 'development') {
          tokenOption.secure = true;
        }
        res.cookie("token", token, tokenOption).status(200).json({
          message: "Login successfully",
          data: token,
          success: true,
          error: false
        });
        _io.once('connection', (socket) => {
          socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", saveUser.id)
        })
      }
    }
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = googleLogin