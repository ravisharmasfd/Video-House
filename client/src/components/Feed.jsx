import { appBarClasses } from '@mui/material';
import React, { useState , useEffect ,useContext} from 'react'
import appStore from '../store/context';
import Post from './Post'
import SharePost from './SharePost'
import Cookies from 'js-cookie';
import axios from 'axios';

function Feed({category}) {
  
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  async function feedTimeline(){
    const token = Cookies.get("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${category}/${page}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
      
    })

    const allPost = res.data.post;
    
    setPosts(allPost);
    
  }
  useEffect(() => {
    feedTimeline();
  }, [category])
  
  return (
    <div className='basis-5/6 flex flex-col md:flex-row md:flex-wrap gap-4 items-center  md:items-start justify-start h-screen overflow-y-auto p-4 '>
      {
        posts.map(
          (item)=>{
            return <Post key={item._id} postData={item}></Post>
          }
        )
      }
      
    </div>
  )
}

export default Feed