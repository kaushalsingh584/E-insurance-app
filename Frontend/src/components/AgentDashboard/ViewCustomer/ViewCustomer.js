import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

function ViewCustomer() {
  const token = localStorage.getItem('token');
  const navigateObject = new useNavigate()
  const param = useParams();
  const role = jwtDecode(token).roles;
  const username = jwtDecode(token).sub;;
  let customersRows= []

  const [customers, setCustomers] = useState([]);


  const getAllCustomers = async (e) => {
    const resp = await axios.get(`http://localhost:8080/customer/findByagentid/${username}`,
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
      console.log(resp);
      setCustomers(resp.data)
      // navigateObject(`/agentdashboard/${username}/${role}`)
    }

  useEffect(() => {
    getAllCustomers()
  }, [])

  const deleteCustomer = async (e) => {
    console.log(e.target.parentElement.parentElement.firstChild.innerText);
    const id = e.target.parentElement.parentElement.firstChild.innerText
    // alert("are you sure you want to delete")
    var answer = window.confirm("Are You Sure ? You really want to delete!!!");
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
  const updateCustomer = (e) => {

  }

  if(customers != null)
  {
     customersRows = customers.map((customer, index) => {
      var status = "true"
      if (customer.user.status == false) {
        status = "false"
      }
  
      return (
        <tr style={{ color: 'white' }}>
  
          <td>{customer.customerId}</td>
          <td>{customer.user.username}</td>
          <td>{customer.DOB}</td>
          <td>{customer.user.email}</td>
          <td>{customer.user.address}</td>
          <td>{customer.phone}</td>
          <td>{customer.nominee}</td>
          <td>{customer.nomineeRelation}</td>
          <td>{status}</td>
          <td>{customer.document}</td>
        </tr>
      )
    })
  }
 

  return (
    <>
      <div className='container mt-4' style={{ minHeight: "100vh" ,height: '400px', overflowX: 'scroll',backgroundColor:'rgba(20, 20, 20, 0.95)' }}>
      <p style={{ color: 'white'}}><h1> {username}, your Customers List </h1></p>
      <table class="table" style={{ overflow: "hidden" }}>
        <thead>
            <tr style={{ color: 'coral' }}>
              <th scope="col">ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Cust DOB</th>
              <th scope="col">Login ID</th>
              <th scope="col">Address</th>
              <th scope="col">Mobile</th>
              <th scope="col">Nominee</th>
              <th scope="col">Nominee Relations</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {customersRows}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default ViewCustomer