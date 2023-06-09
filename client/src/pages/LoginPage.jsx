import axios from 'axios';
import React, { useContext, useRef,useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';
import appStore from '../store/context';
import { TailSpin } from "react-loader-spinner";


function LoginPage() {
  const [Loading,SetLoading] = useState(false)
  const {dispatch} = useContext(appStore);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      SetLoading(true)
      const loginForm = {
        email : emailRef.current.value,
        password : passRef.current.value
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,loginForm);
      const {data} = res;
      Cookies.set("token",data.token);
      dispatch({type:"login",payload:data.user})
      navigate('/')
      SetLoading(false)
      
    }catch(err){
      SetLoading(false)
      alert(err)
    }
  }
  return (
    <div className='flex flex-row w-full h-screen items-center justify-center md:mt-10 md:mb-10'>
      <div className='md:rounded-2xl h-full flex flex-col items-center justify-center w-full bg-fourth opacity-90 md:w-1/3 appBoxShadow'>
        <div className='w-full flex flex-col items-center justify-center text-first p-5'>
          <p className=' basis-1/2 text-center font-mono font-bold text-2xl'>Watch latest videos on videos house</p>
        </div>
        <div className='w-5/6 flex flex-col h-2/5 bg-first rounded-2xl items-center justify-evenly'>
            <h2 className='font-bold text-center p-2'>Enter your Login details</h2>
            <form onSubmit={handleLogin} className=' flex flex-col items-center justify-center w-full ' >
            <div className='bg-white rounded-3xl w-5/6 flex flex-row justify-center  focus-within:outline-1 focus-within:outline-double focus-within:outline-black'>
            <input ref={emailRef} required className='w-4/5 no-outline rounded-md'type="email" placeholder='Email'></input>
            </div>
            <div className='bg-white mt-2 rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black'>
            <input minLength = '8' ref={passRef} required className='w-4/5 no-outline rounded-md ' type="password" placeholder='Password'></input>
            </div>
            {Loading?<TailSpin
                height="80"
                width="80"
                color="#FFFFFF"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />:<input value='Login' type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w=-1/2"/>}
            </form>
            <Link to='/register' className='mt-3 text-center w-5/6 hover:text-white'>Create Your account</Link>
        </div>
      
      </div>

    </div>
  )
}

export default LoginPage