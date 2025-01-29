


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
        fontSize:'14px',
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
