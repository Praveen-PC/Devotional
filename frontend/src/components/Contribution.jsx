// import React, { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "../App.css";
// import axios from "axios";
// import { context } from "../App";

// const Contribution = () => {
//   const location = useLocation();
//   const receivedData = location.state;
//   const { userRole } = useContext(context);
//   const [contributionFund, setContributionFund] = useState([]);
//   const [userData, setUserData] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [contribution, setContribution] = useState({
//     userid: "",
//     name: "",
//     amount: "",
//     programid: receivedData.id,
//   });
//   console.log(receivedData, "recieved");

//   const handleNumberChange = async (e) => {
//     const value = e.target.value;
//     setPhoneNumber(value);
//     try {
//       if (value && value.length === 10) {
//         const response = await axios.get(
//           `http://localhost:8000/api/userdata/${value}`
//         );
//         setUserData(response.data);
//         console.log("Phone number:", value);
//       }
//       resetContribution();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (userData) {
//       setContribution((prev) => ({
//         ...prev,
//         userid: userData.id,
//         name: userData.username,
//       }));
//     }
//   }, [userData]);
//   console.log(userData);
//   console.log(contribution);
//   const [receipt, setReceipt] = useState(false);
//   const [receiptData, setReceiptData] = useState(null);

//   const handleReceipt = (value) => {
//     setReceipt(true);
//     setReceiptData(value);
//   };

//   const handlePrint = () => {
//     const printContents = document.getElementById("receipt-section").innerHTML;
//     const originalContents = document.body.innerHTML;
//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//   };

//   const handleContribution = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8000/api/addFund", contribution);
//       resetContribution();
//       fetchProgramContribution();
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const fetchProgramContribution = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/programFund/${receivedData.id}`
//       );
//       setContributionFund(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const totalAmount = contributionFund.reduce(
//     (total, value) => total + value.contribution,
//     0
//   );

//   useEffect(() => {
//     fetchProgramContribution();
//   }, []);

//   const resetContribution = () => {
//     setContribution({
//       ...contribution,
//       amount: "",
//     });
//   };

//   return (
//     <div className="container mt-4 ">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-primary fw-bold">Program Contribution</h2>
//         {userRole === "Admin" ? (
//           <small>
//             <button
//               type="button"
//               className="btn btn-success btn-sm"
//               data-bs-toggle="modal"
//               data-bs-target="#staticBackdrop"
//             >
//               Add Fund
//             </button>
//           </small>
//         ) : (
//           ""
//         )}
//       </div>

//       <div className="card shadow-sm mb-4">
//         <div className="card-body">
//           <h4 className="card-title text-success fw-bold">
//             {receivedData.programname}
//           </h4>
//           <p className="text-muted">{receivedData.description}</p>
//           <div className="row">
//             <div className="col-md-6">
//               <p>
//                 <strong>Start Time:</strong>{" "}
//                 {new Date(receivedData.startTime).toLocaleString()}
//               </p>
//             </div>
//             <div className="col-md-6">
//               <p>
//                 <strong>End Time:</strong>{" "}
//                 {new Date(receivedData.endTime).toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col col-md-6">
//           <div className="table-responsive rounded p-3 rounded shadow">
//             <div className="d-flex justify-content-between align-items-center">
//               <h5 className="mb-3 fw-bold">Contributions</h5>
//               <small>
//                 {" "}
//                 <h6 className="bg-secondary text-white rounded p-2 shadow border ">
//                   ₹ {totalAmount}
//                 </h6>
//               </small>
//             </div>

//             <table className="table table-hover align-middle">
//               <thead className="table-primary">
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Contribution</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {contributionFund.length ? (
//                   contributionFund.map((value, id) => (
//                     <tr key={id}>
//                       <td>{id + 1}</td>
//                       <td>{value.name}</td>
//                       <td>₹{value.contribution}</td>
//                       <td>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => handleReceipt(value)}
//                         >
//                           Receipt
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center text-muted">
//                       No contributions yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="col-md-6 gap-2">
//           {receipt && (
//             <div className="col p-3 rounded  shadow ">
//               <h4 className="fw-bold">Receipt</h4>
//               <div id="receipt-section" className="receipt">
//                 <div className="receipt-header">
//                   <h5>Receipt for Contribution</h5>
//                   <p>
//                     <strong>Program:</strong> {receivedData.programname}
//                   </p>
//                 </div>
//                 <div className="receipt-body">
//                   <p>
//                     <strong>Contributor:</strong> {receiptData.name}
//                   </p>
//                   <small>
//                     <p>
//                       <strong>Start:</strong>
//                       {new Date(receivedData.startTime).toLocaleString()}
//                     </p>
//                   </small>
//                   <p>
//                     <strong>Contribution Amount:</strong> ₹
//                     {receiptData.contribution}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {new Date().toLocaleString()}
//                   </p>
//                 </div>
//                 <button className="btn btn-success" onClick={handlePrint}>
//                   Print Receipt
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div
//         className="modal fade"
//         id="staticBackdrop"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title fw-bold" id="staticBackdropLabel">
//                 Add Contribution
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleContribution}>
//                 <div className="mb-3">
//                   <label htmlFor="phoneNumber" className="form-label">
//                     Phone Number
//                   </label>
//                   <input
//                     type="number"
//                     id="phoneNumber"
//                     className="form-control"
//                     placeholder="Enter Phone Number"
//                     value={phoneNumber}
//                     onChange={handleNumberChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="contributionName" className="form-label">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="contributionName"
//                     className="form-control"
//                     onChange={(e) =>
//                       setContribution({ ...contribution, name: e.target.value })
//                     }
//                     value={contribution.name}
//                     placeholder="Enter your Name"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="contributionAmount" className="form-label">
//                     Contribution Amount
//                   </label>
//                   <input
//                     type="number"
//                     id="contributionAmount"
//                     className="form-control"
//                     onChange={(e) =>
//                       setContribution({
//                         ...contribution,
//                         amount: e.target.value,
//                       })
//                     }
//                     placeholder="Enter amount"
//                     value={contribution.amount}
//                   />
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                   >
//                     Close
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Add Contribution
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contribution;

import React, { useContext, useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import "../App.css";
import axios from "axios";
import { context } from "../App";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";

const Contribution = () => {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();
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
  const [receipt, setReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [isedit, setIsEdit] = useState(false);
  const [programData, setProgramData] = useState({
    programName: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  console.log(receivedData, "recieved");

  const handleNumberChange = async (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    try {
      if (value && value.length === 10) {
        const response = await axios.get(
          `http://localhost:8000/api/userdata/${value}`  ) 
        
        setUserData(response.data);
        console.log("Phone number:", value);}
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

  const handleReceipt = (value) => {
    setReceipt(true);
    setReceiptData(value);
  };



  const handlePrint = () => {
    const printContents = document.getElementById("receipt-section").innerHTML; // Get the section to print
    const originalContents = document.body.innerHTML; // Store the current page content
  
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
      name:''
    });
  };

  const column = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Contribution",
      selector: (row) => row.contribution,
    },
    {
      name: "Action",
      selector: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleReceipt(row)}
        >
          Receipt
        </button>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
  };

  const handleEdit = (value) => {
    setIsEdit(true);
    setProgramData({
      programName: value.programname,
      startTime: value.startTime,
      endTime: value.endTime,
      description: value.description,
    });
  };
  console.log("program data", programData);
  const handleCloseEdit = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };
  const handleUpdateProgram = async (id) => {
  try {
    const updatedProgramData = {
      programName: programData.programName,
      startTime: new Date(programData.startTime).toISOString(),
      endTime: new Date(programData.endTime).toISOString(),
      description: programData.description,
    };
    const response = await axios.put(
      `http://localhost:8000/api/updateprogram/${id}`,
      updatedProgramData
    );
    if (response.status === 200) {
      setIsEdit(false);
      toast.success("Program updated successfully!");
      location.state = { ...response.data }; 
      setProgramData({
        ...programData,
        programName: response.data.programname,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        description: response.data.description,
      });
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update program.");
  }
};


  const handleDelete = async (value) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteprogram/${value.id}`
      );
      if (response) {
        navigate("/program");
        toast.success("Program deleted successfully!");
      } else {
        toast.error("Failed to delete program.");
      }
      console.log("program delete");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 " >
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
          <div className="d-flex justify-content-between">
            <h4 className="card-title text-success fw-bold">
              {receivedData.programname}
            </h4>
            {userRole === "Admin" ? (
              <small>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-primary "
                    onClick={() => handleEdit(receivedData)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger "
                    onClick={() => handleDelete(receivedData)}
                  >
                    Delete
                  </button>
                </div>
              </small>
            ) : (
              ""
            )}
          </div>
          <p className="text-muted p-2">{receivedData.description}</p>
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
        {isedit ? (
          <div className=" p-3">
            <div className="border rounded shadow bg-light">
              <h5 className="fw-bold p-3 text-center text-primary">
                Edit Program
              </h5>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateProgram(receivedData.id); }} className="p-3">

                <div className="mb-4">
                  <label
                    htmlFor="programName"
                    className="form-label fw-semibold"
                  >
                    Program Name
                  </label>
                  <input
                    type="text"
                    id="programName"
                    value={programData.programName}
                    className="form-control"
                    placeholder="Enter program name"
                    onChange={(e) =>
                      setProgramData({
                        ...programData,
                        programName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="row mb-4">
                  <div className="col">
                    <label
                      htmlFor="startTime"
                      className="form-label fw-semibold"
                    >
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={
                        programData.startTime
                          ? new Date(programData.startTime)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      id="startTime"
                      className="form-control  "
                      onChange={(e) =>
                        setProgramData({
                          ...programData,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="endTime" className="form-label fw-semibold">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      id="endTime"
                      value={
                        programData.endTime
                          ? new Date(programData.endTime)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      className="form-control  "
                      onChange={(e) =>
                        setProgramData({
                          ...programData,
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={programData.description}
                    className="form-control shadow-sm p-2"
                    rows="4"
                    placeholder="Enter a brief description"
                    onChange={(e) =>
                      setProgramData({
                        ...programData,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-3">
                  <button
                    className="btn btn-secondary btn-sm  px-4 shadow-sm"
                    onClick={handleCloseEdit}
                  >
                    Close
                  </button>
                  <button type="submit"
                    className="btn btn-primary btn-sm  px-4 shadow-sm"
                    
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
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
            <div className="border p-2 rounded">
              <DataTable
                data={contributionFund}
                columns={column}
                customStyles={customStyles}
                striped
                pagination
                highlightOnHover
                responsive
              />
            </div>
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
