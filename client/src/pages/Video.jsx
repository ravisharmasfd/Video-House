import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import postById from "../controllers/postById";
import ReactPlayer from "react-player";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import {ShareSocial} from 'react-share-social' 
import appStore from "../store/context";
import Comments from "../components/comment";
import ShareIcon from '@mui/icons-material/Share';
import Cookies from "js-cookie";
import axios from "axios";
function Video() {
  const {state ,dispatch} = useContext(appStore)
  const [videoData, setVideoData] = useState(null);
  const [videoUser, setVideoUser] = useState(null);
  const [loading,setLoading] = useState(false);
  const [share,setShare] = useState(false);
  
  const [userLike,SetUserLike] = useState(false);
  const { id } = useParams();
  async function fetch() {
    try {
      setLoading(true);
      const response = await postById(id);
      setVideoData(response.post);
      setVideoUser(response.user);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      alert("server error")
    }
  }
  async function checkLike (){
    try{
        if(videoData?.likes?.includes(state?.user?._id)){
            SetUserLike(true);
        }else{
            SetUserLike(false);
        }
    }catch(e̥rr){
      alert("server err")
    }
 }
async function likeFunc(videoId){
    try {
       const token  = Cookies.get('token')
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/post/likes`,{id:videoId},{ headers: { Authorization: `Bearer ${token}` } })
        if(userLike){
            const index = videoData?.likes?.indexOf(state?.user?._id);
            if (index > -1) {
              videoData?.likes?.splice(index, 1);
            }
        }else{
          videoData?.likes?.push(state.user._id)
        }
        checkLike();

    } catch (er) {
      checkLike();
    }
}
  useEffect(
    ()=>{
        checkLike();
    },[id,videoData,state.user?._id,videoData?.likes,userLike,]
)
useEffect(
  ()=>{
      fetch();
    },[id])
  return (
    <div className="w-full h-full flex flex-col justify-start items-center text-white">
      <div className='p-4 w-full  overflow-hidden'><ReactPlayer  className='react-player aspect-video' url={videoData?.video} playing={true} controls/></div>
      <p className="p-4 text-lg">{videoData?.title}</p>
      <div className="flex flex-row items-center justify-between w-full p-4">
        <span className="text-lg hover:text-third font-bold ">{videoData?.views + " views"}</span>
        <Link className="text-lg hover:text-third font-bold " to={`/profile/${videoUser?.userName}`}>
            {
              videoUser?.userName
            }
          </Link>
      </div>
      <div className="flex flex-row items-center justify-between w-full p-4">
            <button className='ml-4 hover:scale-105' onClick={()=>{likeFunc(videoData._id)}}>
                <span className='mr-2'><FavoriteIcon sx={userLike ? {color: "#FF0078"} : { color: "white"}}></FavoriteIcon></span>
                <span className='mr-1'>{videoData?.likes.length}</span>
                <span>{`People like this `}</span>
            </button>
            <button className='ml-4 hover:scale-105' onClick={()=>{setShare(!share)}}>
                <span className='mr-2'><ShareIcon sx={{color: "white"} }></ShareIcon></span>
                <span className={`${share?"text-third":"text-white"}`}>{share?"Close Share":"Share"}</span>
            </button>
      </div>
      {share && <div className="sticky">
      <ShareSocial className='fixed'
     url ={window.location.href}
     socialTypes={['facebook','twitter','reddit','linkedin']}
   />
      </div>}
      <span>Comments</span>
      <Comments videoId={id}/>
    </div>
  );
}

export default Video;
