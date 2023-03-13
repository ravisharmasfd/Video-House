import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userName:{
        type: String,
        unique: true,
        require: true,
        min: 5,
        max: 25,
    },
    firstName:{
        type: String,
        require: true,
        min: 5,
        max: 25,
        uppercase: true,
    },
    lastName:{
        type: String,
        required: true,
        min: 5,
        max: 25,
        uppercase: true,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        min: 8,
    },
    dp:{
        type: String,
        default: "https://res.cloudinary.com/do7ueuane/image/upload/v1670762552/defaultProfile_n4qw2w.jpg"
    },
    followers:{type: Array,
        required: true,
        default: []
    },
    following:{type: Array,
        required: true,
        default: []
    }
},{timestamps:true});
export default new mongoose.model("User", UserSchema);