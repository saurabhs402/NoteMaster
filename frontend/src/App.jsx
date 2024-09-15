import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import { AuthContext } from "./Context/AuthContext";
import Description from "./Components/Description";

import Homepage from "./Components/Homepage";

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
