import React from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function RegisterPage() {
  const navigate = useNavigate();
  const initialRegisterForm = {
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    cPassword: "",
  };
  const [loading, setLoading] = useState(false);
  const [registerForm, SetRegisterForm] = useState(initialRegisterForm);
  const handelInput = (e) => {
    SetRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handelForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (registerForm.password != registerForm.cPassword) {
        throw "Password not match";
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        registerForm
      );
      setLoading(false);
      window.alert(res.data.msg);
      
      navigate("/login");
    } catch (err) {
      setLoading(false);
      window.alert("Error in server");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen items-center justify-center md:mt-10 md:mb-10">
      <div className="appBoxShadow h-full flex flex-col items-center justify-center w-full bg-fourth md:rounded-2xl md:w-1/3  pb-5">
        <div className="w-full flex flex-col items-center justify-center text-black p-5 h-1/3">
          <p className=" basis-1/2 text-center font-mono font-bold text-3xl text-first">
            Watch latest videos on videos house
          </p>
        </div>
        <div className="w-5/6 flex flex-col h-2/3 bg-first rounded-2xl items-center justify-evenly">
          <h2 className="font-bold text-center p-1">
            Enter details for register
          </h2>
          <form
            onSubmit={handelForm}
            className=" flex flex-col items-center justify-evenly w-full h-3/5"
            action=""
          >
            <div className="bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black">
              <input
                onChange={handelInput}
                name="email"
                value={registerForm.email}
                className=" w-4/5 no-outline rounded-md"
                type="email"
                placeholder="Email"
              ></input>
            </div>
            <div className="bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black">
              <input
                onChange={handelInput}
                name="userName"
                value={registerForm.userName}
                className=" w-4/5 no-outline rounded-md"
                type="text"
                placeholder="User Name"
              ></input>
            </div>
            <div className="bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black">
              <input
                onChange={handelInput}
                name="firstName"
                value={registerForm.firstName}
                className=" w-4/5 no-outline rounded-md"
                type="text"
                placeholder="First Name"
              ></input>
            </div>
            <div className="bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black">
              <input
                onChange={handelInput}
                name="lastName"
                value={registerForm.lastName}
                className=" w-4/5 no-outline rounded-md"
                type="text"
                placeholder="Last Name"
              ></input>
            </div>
            <div className="bg-white rounded-3xl w-5/6 flex flex-row justify-center">
              <input
                onChange={handelInput}
                name="password"
                value={registerForm.password}
                className=" w-4/5 no-outline rounded-md"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div className="bg-white rounded-3xl w-5/6 flex flex-row justify-center focus-within:outline-1 focus-within:outline-double focus-within:outline-black">
              <input
                onChange={handelInput}
                name="cPassword"
                value={registerForm.cPassword}
                className=" w-4/5 no-outline rounded-md"
                type="password"
                placeholder="Conform Password"
              ></input>
            </div>
            {loading ? (
              <TailSpin
                height="80"
                width="80"
                color="#FFFFFF"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <input value='Register' type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w=-1/2"/>
            )}
          </form>

          <Link to="/login" className="mt-3 text-center w-5/6 hover:text-white">
            Already have a account
          </Link>
        </div>
      </div>
    </div>
  );
}
