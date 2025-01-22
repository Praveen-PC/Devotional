import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Program from "./components/Program";
import Devotees from "./components/Devotees";
import Add from "./components/Add";
import PrivateRouter from "./components/PrivateRouter";
import Contribution from "./components/Contribution";

export const context = createContext();

const App = () => {
  const [isToken, setIsToken] = useState(false);
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [decodedToken,setDecodedToken]=useState("")

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setIsToken(true);
      setToken(storedToken);
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      setUserRole(decodedToken.userRole);
      setDecodedToken(decodedToken)
    }
  }, []);


  return (
    <Router>
      <context.Provider
        value={{ isToken, setIsToken, userRole, setUserRole, setToken,decodedToken }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRouter role={['Admin']}>
                <Dashboard />
              </PrivateRouter>
            }
          />
          <Route
            path="/program"
            element={
              <PrivateRouter role={['Admin','Devotee']}>
                <Program />
              </PrivateRouter>
            }
          />
          <Route
            path="/devotees"
            element={
              <PrivateRouter role={['Admin']}>
                <Devotees />
              </PrivateRouter>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRouter role={['Admin']}>
                <Add />
              </PrivateRouter>
            }
          />
          <Route path="/programdetails" element={<PrivateRouter role={['Admin','Devotee']}><Contribution/></PrivateRouter>}/>
        </Routes>
      </context.Provider>
    </Router>
  );
};

export default App;
