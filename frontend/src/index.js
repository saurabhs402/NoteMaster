import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Components/Login';
import AuthProvider from './Context/AuthContext';
import Navbar from './Components/Navbar';
import Note from './Components/Note';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
     <App /> 
     {/* <Note/> */}
     {/* <Navbar/> */}
    {/* <Login/> */}
    </AuthProvider>

  </React.StrictMode>
);


