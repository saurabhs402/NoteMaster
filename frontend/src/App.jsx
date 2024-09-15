import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import { AuthContext } from "./Context/AuthContext";
import Description from "./Components/Description";

import Homepage from "./Components/Homepage";
import NotFound from "./Components/NotFound";

const App = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage>
                {" "}
                <Description />
              </Homepage>
            }
          />
          <Route
            path="/login"
            element={
              <Homepage>
                <Login />
              </Homepage>
            }
          />
          <Route
            path="/register"
            element={
              <Homepage>
                <Register />
              </Homepage>
            }
          />
          <Route
            path="/dashboard"
            element={!token ? <Dashboard /> : <Navigate to="/login" />}
          />

           <Route
            path="/notfound"
            element={<NotFound/>}
          /> 
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
