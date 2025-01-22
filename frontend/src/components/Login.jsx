
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../App';
import axios from 'axios';

const Login = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsToken,setToken ,setUserRole} = useContext(context);  

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
     const response= await axios.post('http://localhost:8000/api/loginUser',{phoneNo,password}) 
       const token = response.data.token;
      sessionStorage.setItem('token', token);
      setToken(token);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userRole = decodedToken.userRole;
      setUserRole(userRole); 
      setIsToken(true);
      if (userRole === 'Admin') {
        navigate('/dashboard');
      } else if (userRole === 'Devotee') {
        navigate('/program');
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 p-4">
      <div className="card shadow-sm p-4 bg-light login" style={{ width: '24rem' }}>
        <h2 className="text-center text-dark">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="text"
              id="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
