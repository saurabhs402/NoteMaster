import React, { useState, useContext,useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  let email = useRef(null);
  let password = useRef(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(
      "email & password:",
      email.current.value,
      password.current.value
    );
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", { email:email?.current.value, password:password?.current.value });
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      toast.error(error?.response?.data?.message, {
        duration: 1500,
      });
    }finally{
      if (email && email.current) {
        email.current.value = "";
      }
      if (password && password.current) {
        password.current.value = "";
      }
      
    }
    
  };

  return (
    <>
      <div className="max-w-md relative flex flex-col p-8 my-16 mx-10 rounded-md text-black bg-blue-50">
        <Toaster />

        <div className="text-2xl font-bold font-mono mb-2 text-[#1e0e4b] text-center">
          Welcome back to <span className="text-sky-500">Note Master</span>
        </div>
        <div className="text-sm font-bold font-mono mb-4 text-center text-[#1e0e4b]">
          Log in to your account
        </div>
        <form className="flex flex-col gap-3">
          <div className="block relative">
            <label
              htmlFor="email"
              className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              ref={email}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>
          <div className="block relative">
            <label
              htmlFor="password"
              className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={password}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
          </div>
          <div>
            <Link to="/forgotPassword">
              <p className="text-sm text-sky-500" href="#">
                Forgot your password?
              </p>
            </Link>
          </div>
          <button
            type="submit"
            className="bg-sky-500 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            onClick={handleLogin}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
