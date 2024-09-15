import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <>
      <div className="max-w-md relative flex flex-col p-8 my-16 mx-10 rounded-md text-black bg-blue-50">
        <div className="text-2xl font-bold font-mono mb-2 text-[#1e0e4b] text-center">
          Welcome back to <span className="text-sky-500">Note Master</span>
        </div>
        <div className="text-sm font-bold font-mono mb-4 text-center text-[#1e0e4b]">
          Log in to your account
        </div>
        <form className="flex flex-col gap-3">
          <div className="block relative">
            <label
              for="email"
              className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>
          <div className="block relative">
            <label
              for="password"
              className="block text-gray-800 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
          </div>
          <div>
            <a className="text-sm text-sky-500" href="#">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-sky-500 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
