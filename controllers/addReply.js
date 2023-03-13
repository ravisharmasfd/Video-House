import comment from "../models/comment.js";
import Reply from "../models/reply.js";
const addReply = async(req,res)=>{
    try {
        const reply = new Reply(
            {
                senderId:req.user._id,
                text:req.body.text,
                commentId:req.body.commentId
            }
        )
        await reply.save()
        const c = await comment.findById(reply.commentId);
        await c.updateOne({ $push: { replies: reply._id } })
        res.json(reply)
    } catch (error) {
        console.log("🚀 ~ file: addReply.js:14 ~ addReply ~ error:", error)
        
        res.status(500)
    }
    
}
export default addReply;