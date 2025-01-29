

import React, { useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Reports = () => {
    const [data, setData] = useState([]);
    const [reportDate, setReportDate] = useState({ startDate: '', endDate: '' });
    const [error, setError] = useState('');

    const handleReport = async (e) => {
        e.preventDefault();
        setError(''); 
        try {
            const response = await axios.post('http://localhost:8000/api/allreports', reportDate);
            if (response.data.length > 0) {
                setData(response.data);
            } else {
                setData([]);
                setError('Oops! No Data Found.');
            }
        } catch (error) {
            console.error("API Error:", error);
            setData([]);
            setError('Something went wrong. Please try again.');
        }
    };

    const handlePrintXlsx = () => {
        if (data.length > 0) {
            try {
                const workSheet = XLSX.utils.json_to_sheet(data);
                const workBook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workBook, workSheet, 'ReportData');
                const excelFile = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });

                const buffer = new ArrayBuffer(excelFile.length);
                const view = new Uint8Array(buffer);
                for (let i = 0; i < excelFile.length; i++) {
                    view[i] = excelFile.charCodeAt(i) & 0xFF;
                }

                const blob = new Blob([buffer], { type: "application/octet-stream" });
                saveAs(blob, `contribution_report ${new Date().toLocaleDateString()}.xlsx`);
            } catch (error) {
                console.error("Error generating XLSX:", error);
            }
        } else {
            console.warn("No data available to export.");
        }
    };

    const customStyles = {
        rows: { style: { minHeight: "50px" } },
        headCells: { style: { fontWeight: "bold", fontSize: '14px', backgroundColor: '#f4f6f9', color: '#2c3e50' } },
        cells: { style: { padding: "12px", fontSize: '14px' } },
    };

    const columns = [
        { name: 'S.No', selector: (_, index) => index + 1 },
        { name: "Program Name", selector: row => row.programname },
        { name: "Program Date", selector: row => new Date(row.startTime).toLocaleDateString() },
        { name: "Devotee Name", selector: row => row.username },
        { name: "Phone No", selector: row => row.phone },
        { name: "Contribution", selector: row => row.contribution },
        { name: "Contribution Date", selector: row => new Date(row.createdAt).toLocaleDateString() }
    ];

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <h4 className="fw-bold">Reports</h4>
            </div>

            <div className="card shadow-sm p-4 bg-light">
                <form onSubmit={handleReport}>
                    <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <label htmlFor="startDate" className="form-label text-secondary">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                className="form-control"
                                value={reportDate.startDate}
                                onChange={(e) => setReportDate({ ...reportDate, startDate: e.target.value })}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="endDate" className="form-label text-secondary">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                className="form-control"
                                value={reportDate.endDate}
                                onChange={(e) => setReportDate({ ...reportDate, endDate: e.target.value })}
                            />
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary w-100">Search</button>
                        </div>
                    </div>
                </form>
            </div>

            {error && <div className="border border-danger p-4 rounded text-danger mt-4">{error}</div>}

            {data.length > 0 && (
                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold">Report Data</h5>
                        <button className="btn btn-success btn-sm" onClick={handlePrintXlsx}>
                            Download XLSX
                        </button>
                    </div>
                    <div className="table-responsive mt-3 rounded border p-1">
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                            responsive
                            customStyles={customStyles}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
