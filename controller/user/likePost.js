const postModel = require('../../models/post');

const likePost = async (req, res) => {
  try {
    const { userId, idPost, liked } = req.body
    console.log("user", userId);
    console.log("idpost", idPost);
    console.log("liked", liked);

    const data = await postModel.findById({ _id: idPost })
    if (liked === true) {
      data.userLike.push(userId)
      data.like += 1
      data.liked = liked
    } else {
      data.userLike.pop(userId)
      data.like -= 1
      data.liked = liked
    }
    await data.save()
    res.json({
      data: data,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    });
  }
};

module.exports = likePost;
