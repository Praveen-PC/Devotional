
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Program = () => {
  const [programData, setProgramData] = useState([]);
  const [chooseProgram, setChooseProgram] = useState("CurrrentProgram");
  const [currentProgram, setcurrentProgram] = useState([]);
  const [upCommingProgram, setupCommingProgram] = useState([]);
  const [completedProgram, setcompletedProgram] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/allProgram");
      setProgramData(response.data);

      const currentDateTime = new Date();
      const currentPrograms = [];
      const upcomingPrograms = [];
      const completedPrograms = [];

      response.data.forEach((value) => {
        const programStartTime = new Date(value.startTime);
        const programEndTime = new Date(value.endTime);

        if (
          programStartTime <= currentDateTime &&
          programEndTime >= currentDateTime
        ) {
          currentPrograms.push(value);
        } else if (programStartTime > currentDateTime) {
          upcomingPrograms.push(value);
        } else if (programEndTime < currentDateTime) {
          completedPrograms.push(value);
        }
      });

      setcurrentProgram(currentPrograms);
      setupCommingProgram(upcomingPrograms);
      setcompletedProgram(completedPrograms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProgram = (value) => {
    navigate("/programdetails", { state: value });
  };

  const handleChoosenProgram = (value) => {
    setChooseProgram(value);
  };

  const renderPrograms = () => {
    let programsToRender = [];
    let title = "";

    if (chooseProgram === "CurrrentProgram") {
      programsToRender = currentProgram;
      title = "Current Programs";
    } else if (chooseProgram === "UpcommingProgram") {
      programsToRender = upCommingProgram;
      title = "Upcoming Programs";
    } else if (chooseProgram === "CompletedProgram") {
      programsToRender = completedProgram;
      title = "Completed Programs";
    }

    return (
      <>
        <h5 className="fw-bold mb-3">{title}</h5>
        <div className="d-flex flex-wrap gap-3">
          {programsToRender.map((value, id) => (
            <div
              key={id}
              className="d-flex flex-column align-items-start bg-light rounded p-3 shadow-sm border"
            >
              <h4 className="text-success fw-bold">{value.programname}</h4>
              <p className="text-muted">{value.description}</p>
              <small className="text-secondary">
                <strong>Start:</strong>{" "}
                {new Date(value.startTime).toLocaleString()}
              </small>
              <small className="text-secondary">
                <strong>End:</strong> {new Date(value.endTime).toLocaleString()}
              </small>
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => handleProgram(value)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <div className="d-flex gap-3 mb-4">
        <button
          className={`btn btn-outline-success ${chooseProgram  === "CurrrentProgram" ? "active btn-primary" : " " }`}
          onClick={() => handleChoosenProgram("CurrrentProgram")}
        >
          Current Program
        </button>
        <button
          className={`btn btn-outline-success ${chooseProgram  === "UpcommingProgram" ? "active btn-primary" : " " }`}
          onClick={() => handleChoosenProgram("UpcommingProgram")}
        >
          Upcoming Program
        </button>
        <button
          className={`btn btn-outline-success ${chooseProgram  === "CompletedProgram" ? "active btn-primary" : " " }`}
          onClick={() => handleChoosenProgram("CompletedProgram")}
        >
          Completed Program
        </button>
      </div>

      {/* Render Programs Based on Selection */}
      <div className="row gy-4">
        <div className="col-12">{renderPrograms()}</div>
      </div>
    </div>
  );
};

export default Program;
