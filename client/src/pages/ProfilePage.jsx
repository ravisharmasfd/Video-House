
import { useState,useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import appStore from "../store/context";
import fetchPerson from "../controllers/fetchPerson";
import { Post } from "../components";
import userPostController from "../controllers/userPost";
import followUser from '../controllers/followUser';
import unFollowUser from '../controllers/unFollowUser';
import { useNavigate } from 'react-router-dom';
export default function ProfilePage() {
  const navigate  = useNavigate();
  const {state} = useContext(appStore);
  const {userName} = useParams();
  const [follow,setFollow] = useState(false);
  const [isUserProfile,setIsUserProfile] = useState(false);
  const [profileUser,setProfileUser] = useState(state.user);
  async function check(){
    if(profileUser?.followers?.includes(state.user?._id)) setFollow(true);
    else setFollow(false);
  }
  const handleFollow = async()=>{
    if(follow){
      await unFollowUser(profileUser?._id);
      setFollow(!follow)
      
    }else{
      await followUser(profileUser?._id);
      setFollow(!follow)
    }
    const payload =await fetchUser();
    dispatch({type: "refresh",payload});
    navigate('/');
    navigate(-1);
  }
  async function prof(){
    try {
        if(userName == state?.user?.userName){
          setIsUserProfile(true);
          setProfileUser(state.user);
        }else{
          const person = await fetchPerson((userName));
  
          
          setIsUserProfile(false);
          setProfileUser(person);
        }
    } catch (error) {
      alert("error in server")
    }
  }
  useEffect(() => {
    prof();
    check();
  },[userName,state]);
  return (
   <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
    <div className="flex flex-row items-start justify-between gap-4 w-4/5 rounded-lg mx-auto text-2xl text-fourth">
      <span>{profileUser?.firstName + ' ' + profileUser?.lastName}</span>
      <span>{profileUser?.userName}</span>
    </div>
    <div className="flex flex-row items-start justify-evenly gap-4 w-4/5 rounded-lg mx-auto text-2xl text-fourth">
      <span>{"Followers: " + profileUser?.followers?.length}</span>
      <span>{"Following: " + profileUser?.following?.length}</span>
    </div>
    {!isUserProfile && <button onClick={handleFollow} className='mt-3 mx-auto bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>{follow ? "UnFollow":"Follow"}</button>}
            {isUserProfile && <button onClick={()=>navigate('/edit')} className='mt-3 mx-auto bg-first rounded-xl  p-4 hover:bg-fourth hover:text-black '>Edit Profile</button>}
    
   </div>
  )
}