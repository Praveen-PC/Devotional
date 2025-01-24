

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
  const [serachedItem,setSearchedItem]=useState([])

  const fetchDevotees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/allDevotees");
      setDevotees(response.data);
      setSearchedItem(response.data)
    } catch (error) {
      console.error("Error fetching devotees:", error);
    }
  };

  useEffect(() => {
    fetchDevotees();
  }, []);

  const handleSearch=(e)=>{
    const value=e.target.value;
    const checkData=devotees.filter( (item)=>
    item.username.toLowerCase().includes(value.toLowerCase())||
    item.phone.toLowerCase().includes(value.toLowerCase()) )
    setSearchedItem(checkData)
  }
console.log(serachedItem)
  const customStyles = {
    rows: {
      style: {
        minHeight: "40px", 
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize:'14px'
      },
    },
    cells: {
      style: {
        padding: "10px",
      },
    },
  };

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
        row.devotees.reduce((sum, contribution) => sum + (contribution.contribution || 0), 0),
      sortable: true,
    },
  ];
  
  const expandColumns = [
    {
      name: "Program Name",
      selector: (row) => row.program.programname,
    },
    {
      name: "Program Date",
      selector: (row) =>
        new Date(row.program.startTime).toLocaleDateString() || "N/A",
    },
    {
      name: "Contribution",
      selector: (row) => row.contribution || 0,
    },
    {
      name: "Contribution Date",
      selector: (row) =>
        new Date(row.program.createdAt).toLocaleDateString() || "N/A",
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="table-responsive">
      <div className="border rounded  p-1">
      <DataTable
        columns={expandColumns}
        data={data.devotees || []} 
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
      </div>
    </div>
  );

  return (
    <div className="mt-4 container">
      <h4 className="fw-bold">Devotee's Contributions</h4>
      <div className="border p-2 rounded mt-3 ">
      <input type="search" className="form-control mt-1 p-2" placeholder="Search With UserName || PhoneNumber" onChange={handleSearch}/>
      <div className="border rounded p-2 mt-3">
        <DataTable
          columns={columns}
          data={serachedItem}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          pagination
          highlightOnHover
          responsive
          striped
          persistTableHead
          customStyles={customStyles}
        />
      </div>
      </div>
    </div>
  );
};

export default Devotees;
