import Comment from '../models/comment.js'
import User from '../models/user.js';
const comments = async(req,res)=>{
    try {
        const postId = req.params.postId;

    // Find all comments for the given postId
    const comments = await Comment.find({ postId }).exec();

    // Extract the senderId values and create an array of unique user Ids
    const userIds = [...new Set(comments.map(comment => comment.senderId))];

    // Find all users with the extracted userIds
    const users = await User.find({ _id: { $in: userIds } }).exec();

    // Map the comments to include the corresponding user information
    const commentsWithUser = comments.map(comment => {
      const user = users.find(user => user._id.toString() === comment.senderId.toString());
      return {
        _id : comment._id,
        postId: comment.postId,
        sender: {
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          dp: user.dp
        },
        text: comment.text,
        replies: comment.replies
      };
    });

    res.status(200).json(commentsWithUser);
    } catch (error) {
        console.log("🚀 ~ file: comments.js:15 ~ comments ~ error:", error)
        res.status(500)
    }
    
}
export default comments;