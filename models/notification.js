import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.ObjectId,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    read:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", NotificationSchema);