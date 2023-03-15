import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import appStore from '../store/context';
function Replies({comment}) {
  const {state} =  useContext(appStore);
    const [replies, setReplies] = useState([]);
    const [text , setText] = useState('');
    async function addReply(){
        try {
            const token = Cookies.get('token');
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/post/replies`,{text:text,commentId:comment?._id},{ headers: { Authorization: `Bearer ${token}` } });
            
            setReplies([...replies,{...res.data,sender:state?.user}])
            setText('')
            } catch (error) {
                alert('server error')
                
            }

    }
    useEffect(() => {
        async function fetch (){
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/replies/${comment?._id}`);
            setReplies(res.data);
            } catch (error) {
                alert('server error')
                
            }
            
        }
        fetch()
    },[comment]);
  return (
    <>
        <div className='flex flex-row items-start justify-start gap-4 w-[90%] p-4 bg-second border-black border-dotted border-1 rounded-sm'>
            <textarea className='w-[90%] bg-first rounded-md' placeholder='Add reply' value={text} onChange={(e)=>{setText(e.target.value)}}></textarea>
            <button className='bg-second hover:bg:third rounded-md' onClick={addReply}>Add Reply</button>
        </div>
      {replies.map((reply) => (
        <div className='flex flex-col w-[90%] items-start justify-center rounded-lg bg-second p-2'  key={reply?._id}>
          <p className='mx-auto p-4'>{reply.text}</p>
          <div className='flex flex-row w-[90%] items-center justify-start mx-auto gap-4 '>
            <Link className='bg-first hover:bg:third rounded-lg p-1' to={`/profile/${reply?.sender?.userName}`}>{reply?.sender?.userName}</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Replies