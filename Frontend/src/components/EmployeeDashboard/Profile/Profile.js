import axios from 'axios'
import jwtDecode from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react'
import { resolvePath, useParams } from 'react-router'

const Profile = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  const username = jwtDecode(token).sub


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

  const [salary, setSalary] = useState("first name")
  // const [username, setusername] = useState("last name")
  const [customerId, setCustomerId] = useState(0)
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
    console.log("use effect --admin profile");
    getUserInfo()
  },[])
console.log(username);
  const getUserInfo = async (e) => {
    // e.preventDefault();

    const response = await axios
      .get(
        `http://localhost:8080/employee/${username}`,{
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

    console.log(response.data);
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
    setCustomerId(response.data.employeeId)
    setEmail(response.data.user.email)
    setname(response.data.user.name)
    setAddress(response.data.user.address)
   
    // console.log(username.current,name.current,email.current);
  }
  return (
    <>
      {/* <div className='container d-flex justify-content-left'> */}
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Employee ID</label>
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
            <label for="exampleInputEmail1" className="form-label">address</label>
            <input type="text" className="form-control" id="exampleInputEmail1" value = {address} />
          </div>
         
          
          {/* <button type="submit" className="btn btn-primary">Update</button> */}
        </form>
      {/* </div> */}
    </>

  )
}

export default Profile