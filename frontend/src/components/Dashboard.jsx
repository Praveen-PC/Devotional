import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dashboard");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container mt-5">
      <h3 className="fw-bold  mb-4 ">Admin Dashboard</h3>
      <div className="row g-4">
        {data.map((value, id) => (
          <>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card shadow bg-light border">
                <div className="card-body text-center">
                  <div className="icon-circle bg-primary text-white mb-3">
                    <i className="bi bi-people fs-1"></i>
                  </div>
                  <h5 className="text-primary fw-bold">Devotees</h5>
                  <h3 className="fw-bold">{value.devoteesLength}</h3>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card shadow bg-light border">
                <div className="card-body text-center">
                  <div className="icon-circle bg-success text-white mb-3">
                    <i className="bi bi-calendar-event fs-1"></i>
                  </div>
                  <h5 className="text-success fw-bold">Total Programs</h5>
                  <h3 className="fw-bold">{value.programLength}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card shadow bg-light border">
                <div className="card-body text-center">
                  <div className="icon-circle bg-danger text-white mb-3">
                    <i className="bi bi-cash-stack fs-1"></i>
                  </div>
                  <h5 className="text-danger fw-bold">Total Amount</h5>
                  <h3 className="fw-bold">₹{value.totalAmount.toLocaleString()}</h3>
                </div>
              </div>
            </div>

           
          </>
        ))}
      </div>
    </div>
      
    </>
  );
};

export default Dashboard;
