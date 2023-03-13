import Comment from '../models/comment.js'
const addComment = async(req,res)=>{
    try {
        const comment = new Comment(
            {
                senderId:req.user._id,
                text:req.body.text,
                postId:req.body.postId
            }
        )
        await comment.save()
        res.json(comment)
    } catch (error) {
        console.log("🚀 ~ file: comments.js:15 ~ comments ~ error:", error)
        res.status(500)
    }
    
}
export default addComment;