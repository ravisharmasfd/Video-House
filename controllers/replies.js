import User from '../models/user.js';
import Reply from '../models/reply.js';
const replies = async(req,res)=>{
    try {
        const commentId = req.params.commentId;

    const getReplies = await Reply.find({ commentId }).exec();

    // Extract the senderId values and create an array of unique user Ids
    const userIds = [...new Set(getReplies.map(rep => rep.senderId))];

    // Find all users with the extracted userIds
    const users = await User.find({ _id: { $in: userIds } }).exec();
    // Map the comments to include the corresponding user information
    const repliesWithUsers = getReplies.map(rep => {
      const user = users.find(user => user._id.toString() === rep.senderId.toString());
      return {
        _id : rep._id,
        commentId: rep.commentId,
        sender: {
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          dp: user.dp
        },
        text: rep.text,
        replies: rep.replies
      };
    });

    res.status(200).json(repliesWithUsers);
    } catch (error) {
        console.log("🚀 ~ file: comments.js:15 ~ comments ~ error:", error)
        res.status(500)
    }
    
}
export default replies;