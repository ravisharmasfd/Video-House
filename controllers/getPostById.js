import Post from '../models/post.js';
import User  from '../models/user.js';
const getPostById = async (req, res) => {
    const _id = req.params.id;
    try {
      const post = await Post.findOne({_id});
      const user = await  User.findOne({_id:post.postedBy},{password:0})
      if(post){
        await post.updateOne({views : post.views + 1})
      }
      post.user = user;
      res.status(200).json({post,user});
    } catch (err) {
      console.log("🚀 ~ file: getPostById.js:11 ~ getPostById ~ err:", err)
      res.status(500);
      
    }
  }
  export default getPostById;