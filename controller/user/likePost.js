const postModel = require('../../models/post');

const likePost = async (req, res) => {
  try {
    const { userId, idPost, liked } = req.body;
    const post = await postModel.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false, error: true });
    }
    if (liked) {
      if (!post.userLike.includes(userId)) {
        post.userLike.push(userId);
        post.like += 1;
      }
    } else {
      if (post.userLike.includes(userId)) {
        post.userLike.pull(userId);
        post.like -= 1;
      }
    }
    post.liked = post.userLike.includes(userId);
    await post.save();
    res.json({
      data: post,
      success: true,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true
    });
  }
};

module.exports = likePost;
