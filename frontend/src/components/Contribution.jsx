import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { context } from "../App";

const Contribution = () => {
  const location = useLocation();
  const receivedData = location.state;
  const { userRole } = useContext(context);
  const [contributionFund, setContributionFund] = useState([]);
  const [userData, setUserData] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contribution, setContribution] = useState({
    userid: "",
    name: "",
    amount: "",
    programid: receivedData.id,
  });
  console.log(receivedData, "recieved");

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

  useEffect(() => {
    if (userData) {
      setContribution((prev) => ({
        ...prev,
        userid: userData.id,
        name: userData.username,
      }));
    }
  }, [userData]);
  console.log(userData);
  console.log(contribution);
  const [receipt, setReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const handleReceipt = (value) => {
    setReceipt(true);
    setReceiptData(value);
  };

  const handlePrint = () => {
    const printContents = document.getElementById("receipt-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleContribution = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/addFund", contribution);
      resetContribution();
      fetchProgramContribution();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchProgramContribution = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/programFund/${receivedData.id}`
      );
      setContributionFund(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalAmount = contributionFund.reduce(
    (total, value) => total + value.contribution,
    0
  );

  useEffect(() => {
    fetchProgramContribution();
  }, []);

  const resetContribution = () => {
    setContribution({
      ...contribution,
      amount: "",
    });
  };

  return (
    <div className="container mt-4 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Program Contribution</h2>
        {userRole === "Admin" ? (
          <small>
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Fund
            </button>
          </small>
        ) : (
          ""
        )}
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title text-success fw-bold">
            {receivedData.programname}
          </h4>
          <p className="text-muted">{receivedData.description}</p>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(receivedData.startTime).toLocaleString()}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>End Time:</strong>{" "}
                {new Date(receivedData.endTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col col-md-6">
          <div className="table-responsive rounded p-3 rounded shadow">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-3 fw-bold">Contributions</h5>
              <small>
                {" "}
                <h6 className="bg-secondary text-white rounded p-2 shadow border ">
                  ₹ {totalAmount}
                </h6>
              </small>
            </div>

            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Contribution</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contributionFund.length ? (
                  contributionFund.map((value, id) => (
                    <tr key={id}>
                      <td>{id + 1}</td>
                      <td>{value.name}</td>
                      <td>₹{value.contribution}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleReceipt(value)}
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No contributions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6 gap-2">
          {receipt && (
            <div className="col p-3 rounded  shadow ">
              <h4 className="fw-bold">Receipt</h4>
              <div id="receipt-section" className="receipt">
                <div className="receipt-header">
                  <h5>Receipt for Contribution</h5>
                  <p>
                    <strong>Program:</strong> {receivedData.programname}
                  </p>
                </div>
                <div className="receipt-body">
                  <p>
                    <strong>Contributor:</strong> {receiptData.name}
                  </p>
                  <small>
                    <p>
                      <strong>Start:</strong>
                      {new Date(receivedData.startTime).toLocaleString()}
                    </p>
                  </small>
                  <p>
                    <strong>Contribution Amount:</strong> ₹
                    {receiptData.contribution}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date().toLocaleString()}
                  </p>
                </div>
                <button className="btn btn-success" onClick={handlePrint}>
                  Print Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Contribution
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
