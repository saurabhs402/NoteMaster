import React from 'react'
import Navbar from './Navbar'
import notfound from '../Assets/notfound.png'

function NotFound() {
  return (
    <>
      <Navbar />
      <img src={notfound} alt="notfound" className="h-5/6 max-w-full" />
    </>
  );
}

export default NotFound