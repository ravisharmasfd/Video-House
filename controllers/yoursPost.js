import Post from '../models/post.js';
const yoursPost = async(req, res) => {
    try {
      const page =  req.params.page;
      if(!page) page = 0;
      const currentUser = req.user;
      const userPosts = await Post.find({ postedBy: currentUser._id }).skip(page*20).limit(20);
      res.json({post:userPosts})
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export default yoursPost;