import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const ViewAllInsurance = () => {
  const navigateObject = new useNavigate()
  const token = localStorage.getItem('token')
  const role= jwtDecode(token).roles
  const [count, setCount] = useState(0);
  const [insuranceData, setinsuranceData] = useState([]);

  useEffect(() => {
    console.log("use effect comes into effect ---view all insuranceplans");
    getAllInsurancePlans()
  }, [])


  const getAllInsurancePlans = async (e) => {
    const response = await axios.get(`http://localhost:8080/insuranceplan/getall`,
      {
        headers:
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    ).catch((err) => {
      alert("error occured")
      return
    })
    console.log(response);
    setinsuranceData(response.data)

  }

  const handleUpdate = async (e) => {
    // e.preventDefault()
    console.log(e.target.parentElement.parentElement.firstChild.innerText);
    const id = e.target.parentElement.parentElement.firstChild.innerText
    var answer = window.confirm("Are You Sure ? You really want to update status!!!");
    if (answer) {
    const response = await axios.delete(`http://localhost:8080/insuranceplan/deletebyid/${id}`,
      {
        headers:
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    ).catch((err) => {
      alert(err.message)
      return
    })
    console.log(response);
  }else {
    return;
}
  
    
    setCount(count + 1);
    // navigateObject(`/admindashboard/viewinsurance`)
    // return

  }
  const insuranceRows = insuranceData.map((insurance, index) => {
    return (
      <tr key={insurance.insuranceId} style={{ color: 'white' }}>
        <td >{insurance.insuranceId}</td>
        <td>{insurance.insuranceType}</td>
        <td>{insurance.status == true ? "Active" : "InActive"}</td>
        {  (role === "admin" || role=="employee")  &&
        (<td><button type="button" className="btn btn-danger deleteButton" onClick={ handleUpdate }>Update Status</button></td>)}
      </tr>
    )
  })
  return (
    <>
        <div className='container' style={{ minHeight: "100vh" }} >
        <div style={{ overflowX: 'scroll', }}>
          <p style={{ color: 'white' }}><h1>Insurance Plans</h1></p>
          {role == "admin" && (
            <button className="float-end" onClick={(e) => {
            
              navigateObject('/admindashboard/addinsurance')
            }} >Add Insurance</button>)}
          <br />
          <br />
          <table class="table mt-4" style={{ overflow: "hidden", backgroundColor: 'rgba(20, 20, 20, 0.95)' }}>
          <thead>
            <tr style={{ color: 'coral' }}>
              <th scope="col">ID</th>
              <th scope="col">Insurance Type</th>
              <th scope="col">Status</th>
              {(role === "admin" || role=="employee")  && (
                <th scope="col">Update Status</th>)}
            </tr>
          </thead>
          <tbody>
            {insuranceRows}
          </tbody>
        </table>
      </div>
      </div>
    </>
  )
}

export default ViewAllInsurance