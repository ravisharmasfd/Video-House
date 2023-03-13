import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config.js";
const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
    
    const userExist = await User.findOne({email},{__v:0});
    
    if(userExist){
        const match = await bcrypt.compare(password, userExist.password);
        if(match){
            const payLoad = {
                userName : userExist.userName,
                _id : userExist._id,
                email : userExist.email
              }
              const token = jwt.sign(payLoad, JWT_SECRET);
              const user = {firstName:userExist.firstName,lastName:userExist.lastName,email:userExist.email,userName:userExist.userName}
              res.json({ message: "All Ok", token, user});
        }else{
            res.status(401).json({msg : "check your details"})
        }
    }else{
        res.status(400).json({msg: "check your details"})
    }
    } catch (error) {
        res.status(500);
    }
}
export default loginController;