import React, { useContext, useEffect, useState, useTransition } from "react";
import "../App.css";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState("");
  const [programData, setprogramData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contribution, setContribution] = useState({
    userid: "",
    name: "",
    amount: "",
    programid: "",
  });
  console.log(programData)
  const [printButton, setPrintButton] = useState(false);
  const [printData, setPrintData] = useState({});
  console.log(contribution);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dashboard");
      setData(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      setContribution((prev) => ({
        ...prev,
        userid: userData.id,
        name: userData.username,
      }));
    }
  }, [userData]);

  const handleContribution = async (e) => {
    e.preventDefault();
    try {
      const resposne = await axios.post("http://localhost:8000/api/addFund",contribution );
      setPrintData(contribution);
      resetContribution();
      setPhoneNumber('')

      if (resposne) {
        setPrintButton(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(printButton);
  console.log(printData);
  const handleNumberChange = async (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    try {
      if (value && value.length === 10) {
        const response = await axios.get(
          `http://localhost:8000/api/userdata/${value}`
        );
        setUserData(response.data);
        console.log("Phone number:", value);
      }
      resetContribution();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProgramDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/allprogram");
      setprogramData(response.data.reverse());
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const resetContribution = () => {
    setContribution({
      userid: "",
      name: "",
      amount: "",
      programid: "",
    });
  };

  
  const handlePrint = () => {
    const printContents = document.getElementById("receipt-section").innerHTML; 
    const originalContents = document.body.innerHTML; 
  
    // Replace the body content with the section to print
    document.body.innerHTML = `
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            /* Add any styles needed for printing */
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;
  
    // Trigger the print dialog
    window.print();
  
    // Restore the original content after printing
    document.body.innerHTML = originalContents;
  
    // Optional: Reload the scripts/styles (if needed)
    window.location.reload();
  };
  

 
  
  const handleClosePrint = () => {
    setPrintButton(false); 
    resetContribution()
    setPhoneNumber('')
  };
  console.log(programData)
  
 
  
  
  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between  text-center">
          <h3 className="fw-bold  mb-4 "> Dashboard</h3>
          <small>
            <button
              type="button"
              className="btn btn-success "
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleProgramDetails}
            >
              Add Fund
            </button>
          </small>
        </div>

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
                    <h3 className="fw-bold">
                      ₹{value.totalAmount.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div  className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="staticBackdropLabel">
                Add Contribution
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleContribution}>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contributionName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contributionName"
                    className="form-control"
                    onChange={(e) =>
                      setContribution({ ...contribution, name: e.target.value })
                    }
                    value={contribution.name}
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contributionName" className="form-label">
                    Choose Program
                  </label>
                  <select
                    name=""
                    id=""
                    className="form-select"
                    onChange={(e) =>
                      setContribution({
                        ...contribution,
                        programid: e.target.value,
                      })
                    }
                  >
                    <option value="">select Program Name</option>
                    {programData.map((value, id) => (
                      <option key={id} value={value.id}>
                        {value.programname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="contributionAmount" className="form-label">
                    Contribution Amount
                  </label>
                  <input
                    type="number"
                    id="contributionAmount"
                    className="form-control"
                    onChange={(e) =>
                      setContribution({
                        ...contribution,
                        amount: e.target.value,
                      })
                    }
                    placeholder="Enter amount"
                    value={contribution.amount}
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Add Contribution
                  </button>
                </div>
              </form>
              {printButton ? (
                <>
                  <div className="  border rounded p-3" id="receipt-section">
                    <h6 className="fw-bold">Receipts</h6>
                    <h6 className="mb-1">Receipt for Contribution</h6>
                    <p className="mb-1">
                      <strong>Contributor:</strong>
                      {printData.name}{" "}
                    </p>
                    <p className="mb-1">
                      <strong>Contributor Amount:</strong>₹{printData.amount}{" "}
                    </p>
                    <p className="mb-1">
                      {" "}
                      <strong>Date</strong> {new Date().toLocaleString()}
                    </p>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => handlePrint(contribution)}
                    >
                      Print Receipt
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger mx-3"
                      onClick={ handleClosePrint}
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
