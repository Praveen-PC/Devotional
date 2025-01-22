import React, { useState } from "react";
import "../App.css"
import axios from  'axios'
const Add = () => {
  const [add, setAdd] = useState("AddProgram");
  const [programData,setProgramData]=useState({
    programName:'',
    startTime:'',
    endTime:'',
    description:''
  })
  const [userData,setUserData]=useState({
    username:'',
    phone:'',
    address:'',
    password:'',
    role:''
  })
  const handleAdd = (value) => {
    setAdd(value);
  };
  const handleProgram=async(e)=>{
    e.preventDefault()
    try{
    await axios.post('http://localhost:8000/api/addProgram',programData)
    resetProgram()
    }catch(error){
      console.log(error)
    }

  }
  const handleDevotees=async(e)=>{
    e.preventDefault()
    try{
      await axios.post('http://localhost:8000/api/addUser',userData)
      resetUser()
    }catch(error){
      console.log(error)
    }
  }
  const resetProgram=()=>{
    setProgramData({
      programName:'',
      startTime:'',
      endTime:'',
      description:''

    })
  }
  const resetUser=()=>{
    setUserData({
     username:'',
    phone:'',
    address:'',
    password:'',
    role:''

    })
  }
  return (
    <>
      <div className="container mt-4">
        <small>
          <div className="btn-group">
            <button
              type="button" onClick={() => handleAdd("AddProgram")}
              className={`btn  btn-outline-success ${ add === "AddProgram" ? "active btn-primary" : " " }`} >
              Add Program's </button>
            <button
              type="button"onClick={() => handleAdd("AddDevotees")}
              className={`btn btn-outline-success ${ add === "AddDevotees" ? "active" : " " }`} >
              Add Devotee's
            </button>
          </div>
        </small>
        <div className="mt-4 ">
          {add === "AddProgram" && 
          <div>
            <h5 className="fw-bold ">Add New Program :</h5>
            <div className="mt-2 border p-3 rounded bg-light col-md-6 shadow-sm"> 
              <form onSubmit={handleProgram}>
              
                <div className="row">
                  <div className="col mb-3">
                  <label htmlFor="" className="form-label">Program Name :</label>
                  <input type="text" value={programData.programName}
                   className="form-control" placeholder="Program Name"
                   onChange={(e)=>setProgramData({...programData,programName:e.target.value})}
                   />
                  </div>
                 </div>
                 <div className="row">
                 <div className="col mb-3">
                  <label htmlFor="" className="form-label">Start Time :</label>
                  <input type="datetime-local" value={programData.startTime} className="form-control" placeholder="Program Name"
                  onChange={(e)=>setProgramData({...programData,startTime:e.target.value})}/>
                  </div>
                  <div className="col mb-3">
                  <label htmlFor="" className="form-label">End Time :</label>
                  <input type="datetime-local"  value={programData.endTime} className="form-control" placeholder="Program Name"
                  onChange={(e)=>setProgramData({...programData,endTime:e.target.value})}/>
                  </div>
                 </div>
                 <div className="row">
                  <div className="col mb-3">
                  <label htmlFor="" className="form-label">Description :</label>
                  <textarea name="" id="" value={programData.description} style={{height:'3cm'}} className="form-control p-2" placeholder="Program Details"
                  onChange={(e)=>setProgramData({...programData,description:e.target.value})}></textarea>
                  
                  </div>
                 </div>
                 
                 <div>
                  <button type="submit" className="btn btn-primary">Add Program</button>
                 </div>
                
                
              </form>
            </div>
          </div>
          }

          {add === "AddDevotees" &&  <div>
            <h5 className="fw-bold ">Add New Devotees :</h5>
            <div className="mt-2 border p-3 rounded bg-light col-md-6 shadow-sm"> 
              <form onSubmit={handleDevotees}>
              
                <div className="row">
                  <div className="col mb-3">
                  <label htmlFor="" className="form-label">user Name :</label>
                  <input type="text" value={userData.username}
                   className="form-control" placeholder="User Name"
                   onChange={(e)=>setUserData({...userData,username:e.target.value})}
                   />
                  </div>
                 </div>
                 <div className="row">
                 <div className="col mb-3">
                  <label htmlFor="" className="form-label">PhoneNo :</label>
                  <input type="number" value={userData.phone} className="form-control" placeholder="Phone Number"
                  onChange={(e)=>setUserData({...userData,phone:e.target.value})}/>
                  </div>
                  <div className="col mb-3">
                  <label htmlFor="" className="form-label">Password :</label>
                  <input type="text"  value={userData.password} className="form-control" placeholder="Password"
               onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                  </div>
                 </div>
                 <div className="row">
                  <div className="col mb-3">
                 <label htmlFor="" className="form-label">Role :</label>
                 <select name="" id="" className="form-select" value={userData.role} onChange={(e)=>setUserData({...userData,role:e.target.value})}>
                  <option value="">Select User Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Devotee">Devotee</option>
                 </select>
                  </div>
                 </div>
                 <div className="mb-3">
                  <label htmlFor="" className="form-label">Address :</label>
                  <textarea value={userData.address} className="form-control" name="" id="" style={{height:'3cm'}} onChange={(e)=>setUserData({...userData,address:e.target.value})} placeholder="Enter Your Address"></textarea>
                 </div>
                 <div>
                  <button type="submit" className="btn btn-primary">Add Devotee</button>
                 </div>
              </form>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default Add;
