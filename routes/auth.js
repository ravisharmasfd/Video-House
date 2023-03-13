import { Router } from "express";
import authMiddleWare from "../middleWare/auth.js";
import {loginController,registerController} from '../controllers/index.js'
const router = Router();

router.post("/register",registerController);
router.post("/login",loginController)
router.get('/userinfo',authMiddleWare,async(req,res)=>{
    res.json({msg:"you are authorize",user:req.user});
})
export default router;