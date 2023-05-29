import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import { resolvePath, useParams } from 'react-router'

const Profile = () => {
 
  const token = localStorage.getItem('token')
  const usernamejwt = jwtDecode(token).sub
  const role = jwtDecode(token).roles

  // let customerDetail = {
  //   customerId : useRef(""),
  //   name : useRef(""),
  //   username : useRef(""),
  //   email : useRef(""),
  //   address : useRef(""),
  //   pincode : useRef(""),
  //   city : useRef(""),
  //   state : useRef("not mentioned"),
  //   nominee : useRef(""),
  //   nomineeRelation : useRef(""),
  //   DOB : useRef(""),
  //   age: useRef("")

  // }

  const [customerId, setCustomerId] = useState("first name")
  const [username, setusername] = useState("last name")
  const [email, setEmail] = useState("first name")
  const [name, setname] = useState("last name")
  const [address, setAddress] = useState("first name")
  const [pincode, setPincode] = useState("last name")
  const [city, setCity] = useState("first name")
  const [state, setState] = useState("last name")
  const [phone, setPhone] = useState("first name")
  const [dob, setDOB] = useState("last name")
  const [nominee, setNominee] = useState("first name")
  const [nomineeRelation, setNomineeRelation] = useState("last name")

  useEffect(() => {
    console.log("use effect -- profile");
    getUserInfo()
  }, [])

  const getUserInfo = async (e) => {
    // e.preventDefault();
   

        console.log(token);

    const response = await axios
      .get(
        `http://localhost:8080/customer/${usernamejwt}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
      )
      .catch((err) => {
        alert(err.message);
        return;
      });

    if (!response.data) {
      alert("Data not found");
      return;
    }

    console.log(response);
    // username.current = response.data.user.username
    // name.current = response.data.user.name
    // customerId.current = response.data.customerId
    // email.current = response.data.user.email
    // pincode.current = response.data.pincode
    // address.current = response.data.user.address
    // city.current = response.data.city
    // state.current = response.data.state
    // DOB.current = response.data.DOB
    // nominee.current = response.data.nominee
    // nomineeRelation.current = response.data.nomineeRelation
    setCustomerId(response.data.customerId)
    setEmail(response.data.user.email)
    setname(response.data.user.name)
    setusername(response.data.user.username)
    setAddress(response.data.user.address)
    setCity(response.data.city)
    setPincode(response.data.pincode)
    setState(response.data.state)
    setDOB(response.data.DOB)
    setNominee(response.data.nominee)
    setPhone(response.data.phone)
    setNomineeRelation(response.data.nomineeRelation)

    // console.log(username.current,name.current,email.current);
  }
  return (
    <>
      {/* <div className='container d-flex justify-content-left'> */}
      {/* <form>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">customerId</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {customerId}/>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {name} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {username} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">email</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = { email} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {phone} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">DOB</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {dob} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">nominee</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {nominee} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">nomineeRelation</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {nomineeRelation} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">address</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {address} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">pincode</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {pincode} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">city</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {city} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">state</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {state} />
          </div>
         
          
          <button type="submit" className="btn btn-primary">Update</button>
        </form> */}
      {/* </div> */}

      <div class="container my-5" style={{minHeight : "90vh"}} >

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Customer Profile</h3>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              {/* <div class="col-md-4">
                <img src="https://via.placeholder.com/150" alt="Customer Image" class="img-fluid rounded" />
              </div> */}
              <div class="col-md-8 align-self-center">
                <h4 class="mb-0">{username}</h4>
                <p class="text-muted">{role}</p>
              </div>
            </div>


            <table class="table table-borderless" style={{color : "white"}}> 
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
                  <th scope="row">Date of Birth [ DOB ]</th>
                  <td>{dob}</td>
                </tr>
                <tr>
                  <th scope="row">Nominee</th>
                  <td>{nominee}</td>
                </tr>
                <tr>
                  <th scope="row">nominee Relation</th>
                  <td>{nomineeRelation}</td>
                </tr>    
                <tr>
                  <th scope="row">Phone</th>
                  <td> {phone}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{address}</td>
                </tr>
                <tr>
                  <th scope="row">Pincode</th>
                  <td>{pincode} </td>
                </tr>
                <tr>
                  <th scope="row">City</th>
                  <td>{city} </td>
                </tr>
                <tr>
                  <th scope="row">State</th>
                  <td>{state}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>

      </div>

    </>

  )
}

export default Profile