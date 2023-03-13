import React, { useContext, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import appStore from '../store/context';
import Cookies from 'js-cookie';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';

function Post({postData}) {
    const Navigate = useNavigate();
    const token = Cookies.get("token");
    const [userPost,setUserPost] = useState(false);
    const {state} = useContext(appStore);
    const [menu,setMenu] = useState(false);
    const {_id , image, createdAt ,postedBy} = postData;
    async function deleteFunc(){
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/post/${_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            Navigate('/profile');
            Navigate(-1);
        } catch (error) {
            console.log(error)
        }
    }
    const checkUserPost = ()=>{
        if(postedBy?.toString() === state?.user?._id?.toString()){
            setUserPost(true);
        }
    }
    useEffect(
        ()=>{
            checkUserPost();
        },[postData]
    )
  return (
    <div className='post-box bg-second mt-5 rounded-xl w-3/4 h-3/4 md:w-[30%] md:h-[60%] flex flex-col text-white overflow-hidden'>
        <div className='flex flex-row justify-between'>
            <div  className='hover:scale-105  flex flex-row justify-center mt-3 p-4'>
                <div><span>{moment(createdAt).fromNow()}</span></div>
            </div>
            <div onClick={()=>{setMenu(!menu);console.log(menu)}}className={`mt-3 mr-3 ml-3 ${menu && "bg-first rounded-xl"}`}>{menu ? <MoreVertIcon ></MoreVertIcon> : <MoreHorizIcon></MoreHorizIcon>}</div>
        </div>
        {menu && <div onMouseLeave={()=>{setMenu(false)}} className='relative '>
            <div className="absolute bg-third rounded-md border-white border-3 border-solid w-1/2  left-[45%] top-4 z-20 overflow-hidden appBoxShadow">
                <div className='flex flex-col items-center justify-between' >
                {userPost && <button onClick={deleteFunc} className='hover:bg-second w-full border-b-2 border-white hover:border-black border-solid p-1 hover:text-black'>Delete</button>}
                <button onClick={()=>{alert("Currently, this feature is not include")}} className='hover:bg-second w-full border-b-2 border-white hover:border-black border-solid p-1 hover:text-black'>Bookmark</button>
                </div>
            </div>
            </div>}

        <Link to={`/video/${_id}`} className='text-center mt-3'>{postData.title}</Link>
        <Link to={`/video/${_id}`} className='hover:scale-105 p-4 h-1/2 overflow-hidden flex flex-row justify-center items-center mt-3 aspect-video'><img className=" rounded-lg w-4/5 object-contain" src={image}></img>
        </Link>
        <div className='flex flex-row justify-between mt-3 mb-3 p-4'>
            <span>{`${postData.views} views`}</span>
        </div>
    </div>
  )
}

export default Post