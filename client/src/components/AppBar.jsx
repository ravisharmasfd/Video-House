import SearchBar from "./SearchBar";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import appStore from "../store/context";
import { useRef } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FileUploadIcon from '@mui/icons-material/FileUpload';


function AppBar() {
  const menu = useRef();
  const {state,dispatch} =useContext(appStore);
  const navigate = useNavigate();
  const handleClose = ()=>{
    menu.current.classList.remove('absolute');
    menu.current.classList.add("hidden");
  }
  const logoutFunc = ()=>{
    dispatch({type: 'logout'})
    Cookies.remove('token')
    navigate('/login');
    handleClose();

  }
  
  return (
   <div className="sticky w-screen z-50 h-8 md:h-20 ">
    <div className="bg-third w-full flex flex-row h-full items-center justify-between ">
    <Link to="/" className="basic-1/4 flex flex-row items-center justify-center"><span className="text-white ml-10"><b>Video House</b></span></Link>
    <div className="hidden md:block  basic-1/4"><SearchBar></SearchBar></div>
    <div className="basic-2/4  flex flex-row items-center justify-between mr-5">
      <div className="flex flex-row items-center justify-between mr=20 text-fourth text-sm ">
        <div className="hidden md:block w-full">
        <Link className="ml-8 cursor-pointer hover:text-second" to='/upload'><FileUploadIcon ></FileUploadIcon> Upload</Link>
        <Link className="ml-8 cursor-pointer hover:text-second" to={`/profile/${state?.user?.userName}`}><PersonIcon ></PersonIcon>Profile</Link>
        <Link className="ml-8 cursor-pointer hover:text-second" to='/edit' ><EditIcon></EditIcon>Edit Profile</Link>
        <button onClick={logoutFunc} ><LogoutIcon  className="ml-8 cursor-pointer hover:text-second" ></LogoutIcon>Logout</button>
        </div>
        <div className="md:hidden" onClick={()=>{
          menu.current.classList.remove("hidden")
          menu.current.classList.add('absolute');
        }} ><MenuIcon sx={{ color: "white" }} className="ml-2 cursor-pointer"></MenuIcon></div>
        <div ref={menu} className="top-0 right-0 w-screen h-screen z-50 hidden">
          
          <div  className="flex flex-col justify-space opacity-90 items-center w-full h-full bg-second rounded-lg">
            <button onClick={handleClose} className="relative left-1/3 rounded-xl p-4 hover:bg-first  " ><CloseIcon sx={{fontSize: 50 }}></CloseIcon></button>
            <div className="w-5/6"><SearchBar></SearchBar></div>
            <div className="flex flex-col items-center w-full h-full justify-center">
            <Link onClick={handleClose} className="hover:bg-first rounded-lg p-4 m-5 text-sm" to={`/profile/${state?.user?.userName}`}><PersonIcon></PersonIcon><span>Profile</span></Link>
            <Link to='/edit' onClick={handleClose} className="hover:bg-first rounded-lg p-4 m-5 text-sm"><EditIcon></EditIcon><span>Edit Profile</span></Link>
            <Link to='/upload' onClick={handleClose} className="hover:bg-first rounded-lg p-4 m-5 text-sm"><FileUploadIcon></FileUploadIcon><span>Upload</span></Link>
            <button onClick={logoutFunc} className="hover:bg-first rounded-lg p-4 m-5 text-sm"><LogoutIcon></LogoutIcon> <span>Logout</span></button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
 
  )
}

export default AppBar