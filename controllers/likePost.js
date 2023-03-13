import Post from '../models/post.js';

const likePost = async (req, res) => {
    try {
      const postData = await Post.findById(req.body.id);
      if (!postData.likes.includes(req.user._id)) {
        await postData.updateOne({ $push: { likes: req.user._id } });
        res.status(200).json({msg:"The post has been liked"});
      } else {
        await postData.updateOne({ $pull: { likes: req.user._id } });
        res.status(200).json({msg:"The post has been disliked"});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  export default likePost;