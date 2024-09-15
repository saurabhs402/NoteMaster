import React, { useContext } from "react";
import {
  Link
} from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";
import note from "../Assets/note2.png"

import Navbar from "./Navbar";


function Homepage({children}) {
     const { token, logout } = useContext(AuthContext);
  return (
    <>
      <div className="min-h-screen bg-blue-50">
        <Navbar />

        <div className="flex h-screen py-20">
          <div className=" p-8 basis-1/2 flex-row items-start justify-center mx-2">
            {children}
          </div>

          <div className="relative  basis-1/2 items-start py-20 mx-4">
            <img
              src={note}
              alt="note-img"
              className="h-5/6 max-w-full object-contain absolute right-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage