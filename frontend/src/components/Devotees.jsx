

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Devotees = () => {
//   const [devotees, setDevotees] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);

//   const fetchDevotees = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/allDevotees");
//       setDevotees(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRowClick = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);  
//   };

//   useEffect(() => {
//     fetchDevotees();
//   }, []);

//   return (
//     <div className="mt-4 container">
//       <h5 className="fw-bold">Devotee's Contributions</h5>
//       <div className="mt-2 table-responsive">
//         <table className="table table-hover">
//           <thead className="table-primary">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Contribution</th>
//             </tr>
//           </thead>
//           <tbody>
//             {devotees.map((devotee, index) => (
//               <React.Fragment key={devotee.id}>
//                 <tr onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
//                   <td>{index + 1}</td>
//                   <td>{devotee.username}</td>
//                   <td>{devotee.phone }</td>
//                   <td>{devotee.address }</td>
//                   <td>
//                     {devotee.devotees?.reduce(
//                       (sum, devoteeContribution) => sum + (devoteeContribution.contribution || 0),
//                       0
//                     ) || "0"}
//                   </td>
//                 </tr>

//                 {expandedRow === index && (
//                   <tr>
//                     <td colSpan="6">
//                       <div className="table-responsive">
//                         <table className="table table-bordered">
//                           <thead className="table-secondary">
//                             <tr>
//                               <th>Program Name</th>
//                               <th>Program Date</th>
//                               <th>Contribution</th>
//                               <th>Contribution Date</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {devotee.devotees?.map((devoteeContribution, idx) => (
//                               <tr key={idx}>
//                                 <td>{devoteeContribution.program.programname}</td>
//                                 <td>{new Date(devoteeContribution.program.startTime).toLocaleDateString()}</td>
//                                 <td>{devoteeContribution.contribution}</td>
//                                 <td>{new Date(devoteeContribution.createdAt).toLocaleString()}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Devotees;


import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const Devotees = () => {
  const [devotees, setDevotees] = useState([]);
  
  const fetchDevotees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/allDevotees");
      setDevotees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDevotees();
  }, []);

  // Columns for the main table
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "N/A",
    },
    {
      name: "Address",
      selector: (row) => row.address || "N/A",
    },
    {
      name: "Total Contribution",
      selector: (row) =>
        row.devotees?.reduce(
          (sum, contribution) => sum + (contribution.contribution || 0),
          0
        ) || "0",
      sortable: true,
    },
  ];

  // Expandable component for each row
  const ExpandedComponent = ({ data }) => (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Program Name</th>
            <th>Program Date</th>
            <th>Contribution</th>
            <th>Contribution Date</th>
          </tr>
        </thead>
        <tbody>
          {data.devotees?.map((devoteeContribution, idx) => (
            <tr key={idx}>
              <td>{devoteeContribution.program.programname}</td>
              <td>
                {new Date(devoteeContribution.program.startTime).toLocaleDateString()}
              </td>
              <td>{devoteeContribution.contribution}</td>
              <td>
                {new Date(devoteeContribution.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="mt-4 container ">
      <h2 className="fw-bold">Devotee's Contributions</h2>
      <div className="border rounded p-2 mt-3 ">
      <DataTable
        columns={columns}
        data={devotees}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        highlightOnHover
        responsive
        persistTableHead
      />
      </div>
    </div>
  );
};

export default Devotees;
