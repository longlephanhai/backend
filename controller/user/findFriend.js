const userModel = require("../../models/userModal");
const findFriend = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i', 'g');
    if (!query) {
      return res.json({
        data: [],
        success: true,
        error: false,
        message: "No query parameter provided"
      });
    }
    else {
      const user = await userModel.find({
        "$or": [
          {
            name: regex
          }
        ]
      })
      res.json({
        data: user,
        success: true,
        error: false
      })
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
module.exports = findFriend