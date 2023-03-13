import { Router } from "express";
import {timelineAll,likePost,deletePost,getPostById, yoursPost, followingPost,replies, searchPost, addReply, addComment, comments} from '../controllers/index.js'
import userPostById from "../controllers/userPostById.js";
import authMiddleWare from "../middleWare/auth.js";
const router = Router();


  router.delete("/:id", authMiddleWare, deletePost);
  router.post("/likes",authMiddleWare, likePost );
  router.get("/:id", getPostById);
  router.get('/user/:id',userPostById)
  router.get("/treading/:page",authMiddleWare ,timelineAll);
  router.get("/yours/:page",authMiddleWare ,yoursPost);
  router.get("/following/:page",authMiddleWare ,followingPost);
  router.get('/comments/:postId',comments);
  router.get('/replies/:commentId',replies);
  router.put('/comments',authMiddleWare,addComment)
  router.put('/replies',authMiddleWare,addReply)
  router.get('/search/:text',searchPost)
export default router;