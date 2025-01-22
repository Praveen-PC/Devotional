

import React, { useEffect, useState } from "react";
import axios from "axios";

const Devotees = () => {
  const [devotees, setDevotees] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchDevotees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/allDevotees");
      setDevotees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);  
  };

  useEffect(() => {
    fetchDevotees();
  }, []);

  return (
    <div className="mt-4 container">
      <h5 className="fw-bold">Devotee's Contributions</h5>
      <div className="mt-2 table-responsive">
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Contribution</th>
            </tr>
          </thead>
          <tbody>
            {devotees.map((devotee, index) => (
              <React.Fragment key={devotee.id}>
                <tr onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                  <td>{index + 1}</td>
                  <td>{devotee.username}</td>
                  <td>{devotee.phone }</td>
                  <td>{devotee.address }</td>
                  <td>
                    {devotee.devotees?.reduce(
                      (sum, devoteeContribution) => sum + (devoteeContribution.contribution || 0),
                      0
                    ) || "0"}
                  </td>
                </tr>

                {expandedRow === index && (
                  <tr>
                    <td colSpan="6">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead className="table-secondary">
                            <tr>
                              <th>Program Name</th>
                              <th>Program Date</th>
                              <th>Contribution</th>
                              <th>Contribution Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {devotee.devotees?.map((devoteeContribution, idx) => (
                              <tr key={idx}>
                                <td>{devoteeContribution.program.programname}</td>
                                <td>{new Date(devoteeContribution.program.startTime).toLocaleDateString()}</td>
                                <td>{devoteeContribution.contribution}</td>
                                <td>{new Date(devoteeContribution.createdAt).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Devotees;
