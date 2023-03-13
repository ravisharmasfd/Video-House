import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Replies from './Replies';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import appStore from '../store/context';
const Comments = ({ videoId }) => {
    const {state,dispatch} =  useContext(appStore);
    const[open , setOpen]  = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText , setCommentText] = useState('');
    async function addComment(){
        try {
            const token = Cookies.get('token');
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/post/comments`,{text:commentText,postId:videoId},{ headers: { Authorization: `Bearer ${token}` } });
            
            setComments([...comments,{...res.data,sender:state?.user}])
            setCommentText("")
            } catch (error) {
                alert('server error')
                
            }

    }
    useEffect(() => {
        async function fetch (){
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/comments/${videoId}`);
            setComments(res.data);
            } catch (error) {
                alert('server error')
                
            }
            
        }
        fetch()
    },[videoId]);
  return (
    <div className='flex flex-col justify-center items-center w-[90vw] gap-4 overflow-y-auto bg-third rounded-xl p-8 my-4'>
        <div className='flex flex-row items-start justify-start gap-4 w-4/5 p-4 bg-second rounded-xl'>
            <textarea className='w-3/4 bg-first rounded-xl' value={commentText} onChange={(e)=>{setCommentText(e.target.value)}} placeholder="New Comment"></textarea>
            <button className='bg-second hover:bg:third rounded-xl' onClick={addComment}>Add Comment</button>
        </div>
      {comments.map((comment) => (
        <div className='flex flex-col w-4/5 items-start justify-center rounded-xl bg-second p-2'  key={comment?._id}>
          <p className='mx-4 p-4'>{comment.text}</p>
          <div className='flex flex-row w-4/5 items-center justify-start mx-4 gap-4 '>
            <Link className='bg-first hover:bg:third rounded-xl p-1' to={`/profile/${comment?.sender?.userName}`}>{comment?.sender?.userName}</Link>
            <button className='bg-first hover:bg:third rounded-xl p-1' onClick={()=>{
              if(comment?._id == open) setOpen(null);
              else setOpen(comment?._id);
            }}><span>{comment?.replies?.length + " replies"}</span></button>
          </div>
          {open == comment?._id && (
            <Replies comment={comment}></Replies>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;