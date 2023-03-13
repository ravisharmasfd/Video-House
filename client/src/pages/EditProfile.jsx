import React, { useRef } from "react";
import { useContext } from "react";
import appStore from "../store/context";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const { state,dispatch} = useContext(appStore);
  const user = state.user;
  const firstRef = useRef();
  const lastRef = useRef();
  const relationRef = useRef();
  async function handleForm(e){
    e.preventDefault();
    const data = {
      firstName : firstRef.current.value,
      lastName : lastRef.current.value,

    }
    try {
      const token = Cookies.get('token');
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/user`,data,{
        headers:{
          Authorization :  `Bearer ${token}`
        }
      })
      alert('Your profile is updated')
      const payload = res.data.data;
      dispatch({
        type:"refresh",
        payload
      })
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  return (
      <div className="flex flex-col items-center justify-center w-full h-full p-10 ">
        <div className="mt-10 sm:mt-0 rounded-2xl">
          <div className="md:grid md:grid-cols-3 md:gap-6">

            <div className="mt-6 md:col-span-2 md:mt-0 ">
              <form onSubmit={handleForm}>
                <div className="overflow-hidden shadow sm:rounded-md ">
                  <div className="bg-slate-200 px-4 py-5 sm:p-6 appBoxShadow">
                  <h1 className="font-bold m-5 text-center ">Edit Your Profile Information</h1>
                    <div className="grid grid-cols-6 gap-6">
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          required
                          type="text"
                          ref={firstRef}
                          placeholder={user?.firstName}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                        required
                          type="text"
                          ref={lastRef}
                          placeholder={user?.lastName}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-200 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="mr-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={()=>navigate(-1)}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EditProfile;
