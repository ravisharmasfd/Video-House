import User from '../models/user.js';
import bcrypt from 'bcrypt';
import {JWT_SALT} from '../config/config.js'

const registerController = async(req,res)=>{
    try{
    const {userName,firstName, lastName,email,password} = req.body;
    if (email === undefined || userName === undefined || password === undefined || firstName === undefined) {
    
        res.status(404).json({ msg: "Check yor data" });
        return;
      }
    const findByUserName = await User.findOne({userName});
    const findByEmail = await User.findOne({email});
    if(findByEmail){
        res.status(400).json({msg: "Same email already present"})
        return;
    }
    if(findByUserName){
        res.status(400).json({msg: "Same userName already present"})
        return;
    }
    const jwtSalt = JWT_SALT
    const salt = await bcrypt.genSaltSync(parseInt(jwtSalt, 10));
    const hash = await bcrypt.hashSync(password, salt);
    const newUser = await new User({userName,firstName, lastName,email,password:hash});

    
        const createUser = await newUser.save();
        res.json({msg:`new user ${firstName} ${lastName} is created on video house`})
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
};

export default registerController;