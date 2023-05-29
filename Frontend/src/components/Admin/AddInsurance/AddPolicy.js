import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router';

function AddPolicy() {

  const policyName = useRef();
  const statusRef = useRef();
  const navigateObject = new useNavigate();
  const token = localStorage.getItem('token')
  const username = jwtDecode(token).sub
  const role = jwtDecode(token).role
  console.log("inside addd policy --------", username);

  const AddNewPolicy = async (e) => {
    e.preventDefault()

    if (policyName.current.value.trim() == "") {
      alert("Insurance Plan can't be empty !")
      return false
    }
    const status = statusRef.current.value
    const data = {
      insuranceType: policyName.current.value,
      status: statusRef.current.value
    }
    console.log("type ", data);
    try {
      let response = await axios.post(`http://localhost:8080/insuranceplan/save`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )


    } catch (err) {

      if (err.response.data.message.includes("SQL [n/a]; constraint"))
        alert("Insurance Plan already exists")
      else
        alert(err.message)
      return false
    };


    return true

  }
  return (
    <>
      <center>
        <h1 style={{ color: "white" }}><b>Add New Scheme</b></h1>

      </center>
      <div className='container mt-4' style={{ minHeight: "100vh" }}>
        <form>
          <label className="form-label">Enter the policy</label>
          <input type="text" className="form-control" ref={policyName} />

          <label className="form-label">Status</label>
          <select className="form-select" aria-label="Default select example" ref={statusRef} >
            <option value={true} >True </option>
            <option value={false} >False </option>
          </select>
          <br />
          <br />

          <button type="submit" onClick={(e) => {
            // AddNewPolicy(e)
            AddNewPolicy(e).then((validated) => {
              console.log("value of inside add new Policy function", validated);
              if (validated) {

                alert("insurance added !!")
                navigateObject(`/admindashboard/${username}/${role}`)
              }
              else {
                e.preventDefault()
              }
            })
          }} className="btn btn-success">Add Insurance</button>
        </form>
      </div>
    </>

  )
}

export default AddPolicy