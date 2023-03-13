import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.ObjectId,
      required: true
    },
    senderId: {
      type: mongoose.ObjectId,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    replies:{
      type: Array,
      default:[]
    } 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", CommentSchema);