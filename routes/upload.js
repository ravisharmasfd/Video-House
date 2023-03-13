import cloudinary from 'cloudinary';
import { Router } from 'express';
import {CLOUD_NAME,CLOUD_KEY,CLOUD_SECRET} from '../config/config.js';
import authMiddleWare from '../middleWare/auth.js';
import path from 'path';
import multer from 'multer';
import url from 'url';
import fs from  "fs";
import post from '../models/post.js';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
});

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
    destination: `${path.join(__dirname,'upload')}`
  });
  const upload = multer({ storage: storage });


const router = Router();

router.post('/',authMiddleWare, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
    try {
      const { title } = req.body;
      const { path: videoPath } = req.files['video'][0];

      const { path: thumbnailPath } = req.files['thumbnail'][0];
      
      // Upload video to Cloudinary
      const videoUploadResult = await cloudinary.v2.uploader.upload(videoPath,{resource_type: 'video'});
      fs.unlinkSync(videoPath);
      // Upload thumbnail to Cloudinary
      const thumbnailUploadResult = await cloudinary.v2.uploader.upload(thumbnailPath, {
        resource_type: 'image'
      })
      fs.unlinkSync(thumbnailPath);
      // Save video data to MongoDB
      const postDetail = new post({
        title,
        video: videoUploadResult.secure_url,
        image: thumbnailUploadResult.secure_url,
        postedBy: req.user._id
      });
  
      await postDetail.save();
    
      res.send(postDetail);
    } catch (error) {
      console.log("🚀 ~ file: upload.js:59 ~ router.post ~ error:", error)
      res.status(500).send('Server error');

    }
  });



export default router;
