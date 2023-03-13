import Post from "../models/post.js";
const searchPost = async(req,res)=>{
    try {
        const { text } = req.params;
    
        // Find all posts with titles containing the search term
        const posts = await Post.find({ title: { $regex: text, $options: 'i' } }).exec();
    
        res.status(200).json(posts);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    }
export default searchPost;