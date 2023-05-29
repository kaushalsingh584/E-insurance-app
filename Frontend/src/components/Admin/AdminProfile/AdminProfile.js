import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import { resolvePath, useParams } from 'react-router'

const AdminProfile = () => {


    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const role = decode.roles
    const username = decode.sub
    const [customerId,setCustomerId] = useState(0)
  const [email, setEmail] = useState("first name")
  const [name, setname] = useState("last name")
  const [address, setAddress] = useState("first name")

  

  const getUserInfo = async (e) => {
    // e.preventDefault();

    const response = await axios
      .get(
        `http://localhost:8080/admin/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
      )
      .catch((err) => {
        alert(err.message);
        return;
      });

    // if (!response.data) {
    //   alert("Data not found");
    //   return;
    // }

    console.log(response);
    setCustomerId(response.data.agentId)
    setEmail(response.data.user.email)
    setname(response.data.user.name)
    setAddress(response.data.user.address)

    // console.log(username.current,name.current,email.current);
  }
  useEffect(() => {
    console.log("use effect --admin profile");
    getUserInfo()
  }, [])
  return (
    <>
      {/* <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">customerId</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={customerId} />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={name} />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={username} />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">email</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={email} />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">address</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={address} />
        </div>


        <button type="submit" className="btn btn-primary">Update</button>
      </form> */}

      <div class="container my-5" style={{ minHeight: "80vh" }} >

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Admin Profile</h3>
          </div>
          <hr />
          <div class="card-body">
            <div class="row mb-3">
              {/* <div class="col-md-4">
        <img src="https://via.placeholder.com/150" alt="Customer Image" class="img-fluid rounded" />
      </div> */}
              {/* <div class="col-md-8 align-self-center">
                <h4 class="mb-0">{username}</h4>
                <p class="text-muted">{role}</p>
              </div> */}
            </div>


            <table class="table table-borderless" style={{ color: "white" }}>
              <tbody>

                <tr>
                  <th scope="row">UserName</th>
                  <td>{username}</td>
                </tr>
                <tr>
                  <th scope="row">Name</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{email}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{address}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>

      </div>


    </>

  )
}

export default AdminProfile