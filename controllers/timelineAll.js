import Post from '../models/post.js';
import User from "../models/user.js";

const timelineAll = async(req, res) => {
    try {
      const page =  req.params.page;
      if(!page) page = 0;
      const allPost =  await Post.find({}).skip(page*20).limit(20)
      res.json({post:allPost})
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export default timelineAll;