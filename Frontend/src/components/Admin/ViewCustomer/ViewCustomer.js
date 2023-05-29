import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import jwtDecode from 'jwt-decode';

function ViewCustomer() {
  const token = localStorage.getItem('token');
  const role = jwtDecode(token).roles
  const navigateObject = new useNavigate()
  const param = useParams();
    // const role = param.role;
    // const username = param.username;
 
  const [customers, setCustomers] = useState([]);


  const getAllCustomers = async (e) => {
    const resp = await axios.get(`http://localhost:8080/customer/getall`,
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
    setCustomers(resp.data)
    console.log(resp.data);
  }
  useEffect(() => {
    getAllCustomers()
  }, [])

  const deleteCustomer= async (e)=>{
    e.preventDefault()
    const id = e.target.parentElement.parentElement.firstChild.innerText
    // alert("are you sure you want to delete")
    var answer = window.confirm("Are You Sure ? You really want to update status!!!");
if (answer) {
     let response = await axios.delete(`http://localhost:8080/customer/deletebyid/${id}`,
            
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
 const updateCustomer=(e)=>{
  const id = e.target.parentElement.parentElement.firstChild.innerText
    navigateObject(`/admindashboard/updatecustomer/${id}`)
  }

  const customersRows = customers.map((customer, index) => {
    var status="true"
    if(customer.user.status==false){
      status="false"
    }
   
    return (
      <tr style={{ color: 'white' }}>

        <td>{customer.customerId}</td>
        <td>{customer.user.username}</td>
        <td>{customer.user.name}</td>
        <td>{customer.DOB }</td>
        <td>{customer.user.email}</td>
        <td>{customer.user.address}</td>
        <td>{customer.phone}</td>
        <td>{customer.nominee}</td>
        <td>{customer.nomineeRelation}</td>
        <td>{status}</td>
        {/* <td>{customer.document}</td> */}
     
        <td> <button type="button" class="btn btn-danger" onClick={(e)=>{deleteCustomer(e)}} >Status Update</button></td>
        { role == "admin" && (
        <td> <button type="button" class="btn btn-danger" onClick={(e)=>{updateCustomer(e)}}>update customer</button></td>)}
        
        {/* onClick={(e)=>{editBank(e)}} */}
      </tr>
    )
  })
  
  console.log("role is ",role);
  return (
    <>
    <div className='container'  style={{ minHeight: "100vh"}} >
  <div style={{  overflowX: 'scroll', }}>
      <p style={{ color: 'white'}}><h1>View Customers</h1></p>
      { role == "admin" && (
        
       <button className= "float-end" onClick={(e)=>{
    
    navigateObject('/admindashboard/addcustomer')
  }} >add new customer</button>)}
  <br/>
  <br/>
      <table class="table mt-4" style={{ overflow: "hidden", backgroundColor:'rgba(20, 20, 20, 0.95)'}}>
        <thead>
            <tr style={{ color: 'coral' }}>
              <th scope="col">ID</th>
              <th scope="col"> Userame</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer DOB</th>
              <th scope="col">Login ID</th>
              <th scope="col">Address</th>
              <th scope="col">Mobile</th>
              <th scope="col">Nominee</th>
              <th scope="col">Nominee Relation</th>
              <th scope="col">Status</th>
              <th scope="col">Status Update</th>
              { role == "admin" && (
              <th scope="col">Update </th>)}
            </tr>
          </thead>
          <tbody>
            {customersRows}
          </tbody>
        </table>
                
       
      </div>

      </div>

    </>
  )
}

export default ViewCustomer
