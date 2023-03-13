import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../components';
function Search() {
    const {text} = useParams();
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    async function fetch (){
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/search/${text}`);
            console.log(res.data)
            setPosts(res.data);
            setLoading(false);
        } catch (error) {
            
        }
    }
    useEffect(()=>{fetch()},[text])
    if(loading) return(<div>
        Loading
    </div>)
    if(posts.length == 0) return(<div>
        Nothing found
    </div>)
  return(
   <div className='flex flex-col md:flex-row md:flex-wrap gap-4 items-center  md:items-start justify-start overflow-y-auto p-4 w-[100vw]'>
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

export default Search