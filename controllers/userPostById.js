import Post from '../models/post.js';
import User from "../models/user.js";

const userPostById = async(req, res) => {
    const _id = req.params.id
    try {
      const allPost =  await Post.find({postedBy:_id});
      res.json({post:allPost})
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export default userPostById;