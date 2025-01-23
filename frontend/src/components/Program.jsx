import React, { useContext, useEffect, useState } from 'react'
import { context } from "../App"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "../App.css";
const Program = () => {
  const {userRole}=useContext(context)
  const [curenntProgram,setCurrentProgram]=useState([])
  const [upCommingProgram,setUpcommingProgram]=useState([])
  const [completedProgram,setCompletedProgram]=useState([])
  const [activeTab,setActiveTab]=useState('current')
  const navigate = useNavigate();

  const fetchActiveData=async()=>{
    try{
      const response= await axios.get('http://localhost:8000/api/allProgram');
      const currentDateTime=new Date();
      const currentPrograms=[]
      const upcommingPrograms=[]

      response.data.forEach((value) => {
        const startTime=new Date(value.startTime);
        const endTime=new Date(value.endTime)
        if(startTime<=currentDateTime && endTime>= currentDateTime){
          currentPrograms.push(value)
        }else if(startTime>currentDateTime){
          upcommingPrograms.push(value)
        }
      });
      setCurrentProgram(currentPrograms)
      setUpcommingProgram(upcommingPrograms)

    }catch(error){
      console.log(error)
    }
  }
  const fetchClosedData=async()=>{
    try{
      const response= await axios.get('http://localhost:8000/api/closedProgram')
      setCompletedProgram(response.data.reverse())
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
       fetchActiveData()
       fetchClosedData()
  },[])
  const handleProgram = (value) => {
         navigate("/programdetails", { state: value });
       };
       const handleCloseProgram=async(value)=>{
            console.log(value.id)
            try{
            await axios.put(`http://localhost:8000/api/updateStatus/${value.id}`)
            fetchActiveData()
            }catch(error){
              console.log(error)
            }
          }
 

  const renderProgram = (program) => {
    return program.length ? (
      <div className='d-flex flex-wrap gap-3 mt-3'>
        {program.map((value, id) => (
          <div
            key={id}
            className=' col-md-4 col-lg-3 mb-4'
          >
            <div className='card flip-card bg-light'>
              <div className='card-front'>
                <div className='card-body'>
                  <h4 className='text-success fw-bold'>{value.programname}</h4>
                  <h6 className='text-muted mb-3'>{value.description}</h6>
                  <div className='d-flex justify-content-between'>
                    <p className=' mb-1'>
                      <strong>Start:</strong> <span className='text-muted'> {new Date(value.startTime).toLocaleString()} </span>
                    </p>
                    <p className=' mb-1'>
                      <strong>End:</strong> <span className='text-muted'>{new Date(value.endTime).toLocaleString()} </span> 
                    </p>
                  </div>
                </div>
              </div>
              <div className='card-back'>
                <div className='card-body'>
                  <div className='d-flex gap-3 align-items-center'>
                    <button
                      className="btn btn-primary  mb-2 rounded"
                      onClick={() => handleProgram(value)}
                    >
                      <i className="bi bi-eye"></i> View Details
                    </button>
                    {userRole === 'Admin' && (
                      <button
                        className="btn btn-danger  mb-2 rounded "
                        onClick={() => handleCloseProgram(value)}
                      >
                        <i className="bi bi-x-circle"></i> Close
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-muted mt-5">No Programs Available</p>
    );
  }
  

  


  return (
     <div className='container mt-4'>
      <h3 className='fw-bold'>Program's :</h3>
   <small><div className='d-flex gap-3 mt-3'>
    <small> <button  className={`btn btn-outline-success ${activeTab  === "currrent" ? "active" : " " }`} onClick={()=>setActiveTab('current')}>Current Program</button> </small> 
     <small> <button className='btn btn-outline-success' onClick={()=>setActiveTab('upcomming')}>Upcomming Program</button></small>  
     <small>  <button className='btn btn-outline-success' onClick={()=>setActiveTab('completed')}>Completed Program</button></small> 
      </div></small> 

      <div className=''>
        {activeTab==='current' && renderProgram(curenntProgram) }
        {activeTab==='upcomming' && renderProgram(upCommingProgram)}
        {activeTab==='completed' &&  renderProgram(completedProgram)}
      </div>
     </div>
  )
}

export default Program