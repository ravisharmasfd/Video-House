import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.ObjectId,
        required : true,
    },
    image:{
        type : String,
        unique : true,
        required: true
    },
    likes:{
        type: Array,
        default: []
    },
    comments:{
        type: Array,
        default: []
        },
    video:{
        type : String,
        unique : true,
        required: true
    },
    views:{
        type: Number,
        default:0,
    },
    title:{
        type : String,
        unique : true,
        required: true
    },
},{ timestamps: true });
export default new mongoose.model("Post", PostSchema);