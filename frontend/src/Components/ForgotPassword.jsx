import React, {useRef } from "react";

import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  let email = useRef(null);
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.BASE_URL_BACKEND}/api/auth/forgotPassword`,
        { email: email?.current.value }
      );
      toast.success(response.data.message||"Password reset link send to the user email.",{
           duration: 2000,
         })
    } catch (error) {
      console.error("ForgotPassword error", error);
      toast.error(error?.response?.data?.message||"Not able to Send Reset Link.Try Again!!", {
        duration: 2000,
      });
    } finally {
      if(email&&email.current) email.current.value = "";
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
          Forgot your Password
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
          <button
            type="submit"
            className="bg-sky-500 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            onClick={handleSend}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
