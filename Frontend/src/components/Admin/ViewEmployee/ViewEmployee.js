import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const ViewEmployee = () => {
    const navigateObject = new useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);
  const [agents, setAgents] = useState([]);
  const token = localStorage.getItem('token')
  const role = jwtDecode(token).roles
  const username = jwtDecode(token).sub


  useEffect(() => {
    console.log("use effect comes into effect -- view agent");
    getAllAgents()
  }, []);


  const getAllAgents = async (e) => {
    const resp = await axios.get(`http://localhost:8080/employee/getall`,
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

    console.log(resp.data);
    setAgents(resp.data)
    console.log(resp.data);
  }

  const agentsRows = agents.map((agent, index) => {
    var status = "true"
    if (agent.user.status === false) {
      status = "false"
    }
    return (
      <tr style={{ color: 'white' }}>
        <td>{agent.employeeId}</td>
        <td>{agent.user.username}</td>
        <td>{agent.user.email}</td>
        <td>{agent.user.name}</td>
        <td>{agent.user.address}</td>
        <td>{status}</td>
        <td>{agent.salary}</td>
        {role == "admin" && (
          <td> <button type="button" className="btn btn-danger" onClick={(e) => { handleupdate(e) }} >Update Info</button></td>)}
        <td> <button type="button" className="btn btn-danger" onClick={(e) => { handleDelete(e) }} >Update Status</button></td>
      </tr>
    )
  })

  const handleupdate = async (e) => {

    const id = e.target.parentElement.parentElement.firstChild.innerText
    // const data = {
    //   user: {

    //   },
    // };

    // let response = await axios
    //   .put(
    //     `http://localhost:8080/api/v1/agent/update`,
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       withCredentials: true,
    //     }
    //   )
    //   .catch((err) => {
    //     alert("Error");
    //     return;
    //   });
    navigateObject(`/admindashboard/updateemployee/${id}`)
  }
  const handleDelete = async (e) => {

    console.log(e.target.parentElement.parentElement.firstChild.innerText);
    const id = e.target.parentElement.parentElement.firstChild.innerText
    var answer = window.confirm("Are You Sure ? You really want to update!!!");
    if (answer) {
      let response = await axios.delete(`http://localhost:8080/employee/deletebyid/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
        .catch((err) => {
          alert("Error");
          return;
        });
    }
    else {
      return;
    }
  }


  const addNewAgent = async (e) => {
    console.log("addAgent Hitt");
    navigateObject(`/admindashboard/addagent`)
  }

  return (
    <>
      <div className='container' style={{ minHeight: "100vh" }} >
        <div style={{ overflowX: 'scroll', }}>
          <p style={{ color: 'white' }}><h1>View Employees</h1></p>
          {role == "admin" && (
            <button className="float-end" onClick={(e) => {
            
              navigateObject('/admindashboard/addemployee')
            }} >Add New Employee</button>)}
          <br />
          <br />
          <table class="table mt-4" style={{ overflow: "hidden", backgroundColor: 'rgba(20, 20, 20, 0.95)' }}>
            <thead>
              <tr style={{ color: 'coral' }}>
                <th scope="col">ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Employee Email</th>

                <th scope="col">Employee Username</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">salary</th>
                {role == "admin" && (
                  <th scope="col">Update Info</th>)}
                <th scope="col">Update status</th>
              </tr>
            </thead>
            <tbody>
              {agentsRows}
            </tbody>
          </table>

        </div>
        </div>
      </>
      )
}

export default ViewEmployee