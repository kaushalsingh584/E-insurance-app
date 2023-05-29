import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router';
import validator from "validator";

const AddEmployee = () => {
  const token = localStorage.getItem('token');
  const username = jwtDecode(token).sub;
  const role = jwtDecode(token).roles;



  const navigateObject = new useNavigate();
  // const agentCode = useRef();
  const UserName = useRef();
  const name = useRef();
  const email = useRef();
  const address = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const status = useRef();
  const salary = useRef();
  const statusRef = useRef();


  const validationCheck = async (e) => {
    e.preventDefault();
    let alertString = ""
    console.log("inside add funcion ========================");
    try {

      console.log(password.current.value);
      // console.log(agentCode.current.value);
      console.log(salary.current.value);
      console.log(name.current.value);
      console.log(UserName.current.value);
      console.log(password.current.value);
      console.log(email.current.value);
      console.log(address.current.value);
      console.log(confirmPassword.current.value);

      if (!(password.current.value.trim() != "" &&
        // agentCode.current.value.trim() != "" &&
        salary.current.value.trim() != "" &&
        name.current.value.trim() != "" &&
        UserName.current.value.trim() != "" &&
        email.current.value.trim() != "" &&
        address.current.value.trim() != "" &&
        confirmPassword.current.value.trim() != "")) {
        alert("Please fill all fields !!")
        return
      }

      let resp = await axios
        .get(`http://localhost:8080/user/getAllemail`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .catch((err) => {
          alert("Somethind went wrong !! try again");
          return false;
        });

      console.log("reached ----");
      let emailsData = resp
      console.log(emailsData.data, "email : ", email.current.value);

      if (validator.isEmail(email.current.value.trim())) {
        // setMessage("Thank you");
        console.log("email ok");
        return true
      } else {
        alert("Please, enter valid Email!")
        return false
      }
      if (emailsData.data.includes(email.current.value)) {
        alertString += "Email already exists\n";
      }
      console.log("phase-2");
      if (Boolean(salary.current.value.match(/^[a-zA-z.]*$/)) == false) {
        alertString += "salary cannot container numbers aur special symbols\n"
      }
      if (Boolean(UserName.current.value.match(/^[a-zA-z0-9_]*$/)) == false) {
        alertString += "Username cannot contain special symbols\n"
      }
      if (!(password.current.value.trim() != "" && password.current.value.trim() == confirmPassword.current.value.trim())) {
        alertString += "Both Password and Confirm password do not match\n"
      }
      if (Boolean(name.current.value.match(/^[a-zA-z ]*$/)) == false) {
        alertString += "Name cannot container numbers aur special symbols\n"
      }
      if (Boolean(address.current.value.match(/^[a-zA-z0-9_ ]*$/)) == false) {
        alertString += "Address cannot contain special symbols\n"
      }

      console.log("value of alert string", alertString);
      if (!(alertString == "")) {
        alert(alertString)
        return false
      }
      console.log("value of alert string 2", alertString);
      return true
    }
    catch (err) {
      alert(err.message)
      return false
    }
    console.log("endof function");
  }
  const Add = async (e) => {


    console.log("phase -3");
    const data = {
      // agentCode: agentCode.current.value,
      salary: salary.current.value,
      user: {
        name: name.current.value,
        username: UserName.current.value,
        password: password.current.value,
        role: "employee",
        email: email.current.value,
        address: address.current.value,
        status: statusRef.current.value
      },
    };
    console.log(data);
    let response = await axios
      .post(`http://localhost:8080/employee/save`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);

        if (err.response.data.message.includes("could not execute statement"))
          alert("Username already exists. try with othe one");
        // else if ()
        return;
      });

    alert("Employee added successfully !!!")
  };

  return (
    <div className='container' style={{ minHeight: "100vh" }}>
      <center>
        <h1 style={{ color: "white" }}><b>Add New AddEmployee</b></h1>

      </center>
      <form>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

          <div style={{ flex: 1, marginRight: '20px' }}>

            {/* <label className="form-label">Agent Code</label>
              <input type="number" className="form-control" ref={agentCode} required /> */}



            <label className="form-label">UserName</label>
            <input type="text" className="form-control" ref={UserName} required />

            <label className="form-label">Name</label>
            <input type="text" className="form-control" ref={name} required />

            <label className="form-label">Email</label>
            <input type="text" className="form-control" ref={email} required />

            <label className="form-label">Status</label>
            <select className="form-select" aria-label="Default select example" ref={statusRef} >
              <option value={true} >True </option>
              <option value={false} >False </option>
            </select>



          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label">Salary</label>
            <input type="text" className="form-control" ref={salary} required />


            <label className="form-label">Address</label>
            <input type="text" className="form-control" ref={address} required />

            <label className="form-label">Password</label>
            <input type="password" className="form-control" ref={password} required />


            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" ref={confirmPassword} required />

          </div>
        </div>
        <button type="submit" onClick={(e) => {

          {
            validationCheck(e).then((validated) => {
              console.log("value of insde validation function", validated);
              if (validated) {

                console.log("calling handleadd");
                Add(e)
                navigateObject(`/admindashboard/viewemployee`)
              }
            })
            return

          }
        }} className="btn btn-success">Add Employee</button>

      </form>
    </div>
  )
}

export default AddEmployee