import React, { useRef } from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
   const navigate=useNavigate()
   const password = useRef(null);
   const confirmPassword = useRef(null);
   const {token}=useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/auth/resetPassword/${token}`,
        {
          password: password?.current.value,
          confirmPassword: confirmPassword?.current.value,
        }
      );
      toast.success(response.data.message || "Password reset successfully", {
        duration: 2000,
      });
      setTimeout(()=>navigate('/login'),2000)
    } catch (error) {
      console.error("ResetPassword error", error);
      toast.error(error?.response?.data?.message, {
        duration: 2000,
      });
    } finally {
    
     if (password && password.current) {
       password.current.value = "";
     }
     if (confirmPassword && confirmPassword.current) {
       confirmPassword.current.value = "";
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
          Reset your Password
        </div>
        <form className="flex flex-col gap-3">
          <div className="block relative">
            <label
              htmlFor="password"
              className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
            <p className="text-sm mt-2">Password must have 8 characters</p>
          </div>

          <div className="block relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Confirm Password
            </label>
            <input
              ref={confirmPassword}
              type="password"
              id="confirmPassword"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
