import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.ObjectId,
      required: true
    },
    text : {
      type: String,
      required: true
    },
    commentId:{
      type: mongoose.ObjectId,
      required: true
    }
  },
  {
    timestamps: true,
  }
); 
export default mongoose.model("Reply", ReplySchema);