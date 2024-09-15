import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword=useRef(null)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.BASE_URL_BACKEND}/api/auth/register`,
        {
          name: name?.current.value,
          email: email?.current.value,
          password: password?.current.value,
          confirmPassword: confirmPassword?.current.value,
        }
      );
    toast.success("Registered Sucessfully!")
    setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Registration error", error);
       if (error.status === 400) {
         toast.error(error?.response?.data?.message ||"User Already Exists", {
           duration: 1500,
         });
       } else {
         toast.error(error?.response?.data?.message || "Server Error", {
           duration: 1500,
         });
       }
    }
  };

  return (
    <div className="max-w-md relative flex flex-col p-8 my-16 mx-10 rounded-md text-black bg-blue-50">
      <Toaster />
      <div className="text-2xl font-bold font-mono mb-2 text-[#1e0e4b] text-center">
        Welcome back to <span className="text-sky-500">Note Master</span>
      </div>
      <div className="text-sm font-bold font-mono mb-4 text-center text-[#1e0e4b]">
        Create a new Account
      </div>
      <form className="flex flex-col gap-3">
        <div className="block relative">
          <label
            htmlFor="name"
            className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Name
          </label>
          <input
            ref={name}
            type="text"
            id="name"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
          />
        </div>
        <div className="block relative">
          <label
            htmlFor="email"
            className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Email
          </label>
          <input
            ref={email}
            type="text"
            id="email"
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
          onClick={handleRegister}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
