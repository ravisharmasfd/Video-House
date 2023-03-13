import Post from '../models/post.js';
const followingPost = async(req, res) => {
    try {
      const page =  req.params.page;
      if(!page) page = 0;
      const currentUser = req.user;
      const friendPosts = await Post.find({ postedBy: {$in : currentUser.following} }).skip(page*20).limit(20)
      res.json({post:friendPosts})
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export default followingPost;