import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";


import { AuthContext } from "../Context/AuthContext";
import SearchBox from "./SearchBox";

function Navbar({ search, setSearch }) {
  const { token, logout } = useContext(AuthContext);
  const homeLink = token ? "/dashboard" : "/";
  return (
    <>
      <nav className="bg-sky-500 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
          <Link to={homeLink} className="flex items-center mr-4">
            <FaHome className="text-white text-2xl cursor-pointer hover:text-gray-300 transition-colors" />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold font-mono text-white dark:text-white">
              Note Master
            </h1>
          </div>

          <div className="ml-auto flex space-x-2">
            {!token ? (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="bg-white text-sky-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="bg-white text-sky-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <>
                <SearchBox search={search} setSearch={setSearch} />
                <button
                  onClick={logout}
                  className="bg-white text-sky-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
