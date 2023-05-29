import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import jwtDecode from 'jwt-decode';
import validator from "validator";

function AddAgent() {


  const token = localStorage.getItem('token');
  const username = jwtDecode(token).sub;
  const role = jwtDecode(token).roles;



  const navigateObject = new useNavigate();
  const agentCode = useRef();
  const UserName = useRef();
  const name = useRef();
  const email = useRef();
  const address = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const status = useRef();
  const qualification = useRef();
 

  const validationCheck = async (e) => {
    e.preventDefault();
    let alertString = ""
    console.log("inside add funcion ========================");
    try {

      console.log(password.current.value);
      console.log(agentCode.current.value);
      console.log(qualification.current.value);
      console.log(name.current.value);
      console.log(UserName.current.value);
      console.log(password.current.value);
      console.log(email.current.value);
      console.log(address.current.value);
      console.log(confirmPassword.current.value);

      if (!(password.current.value.trim() != "" &&
        agentCode.current.value.trim() != "" &&
        qualification.current.value.trim() != "" &&
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
      console.log(emailsData.data,"email : ",email.current.value);

      if(validator.isEmail(email.current.value.trim()) )
      {
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
      if (Boolean(qualification.current.value.match(/^[a-zA-z.]*$/)) == false) {
        alertString += "Qualification cannot container numbers aur special symbols\n"
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

      console.log("value of alert string" ,alertString);
      if (!(alertString == "")) {
        alert(alertString)
        return false
      }
      console.log("value of alert string 2" ,alertString);
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
      agentCode: agentCode.current.value,
      qualification: qualification.current.value,
      user: {
        name: name.current.value,
        username: UserName.current.value,
        password: password.current.value,
        role: "agent",
        email: email.current.value,
        address: address.current.value,
        status: true
      },
    };
    console.log(data);
    let response = await axios
      .post(`http://localhost:8080/agent/save`, data, {
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

    alert("Agent added successfully !!!")
  };

  return (
    <div className='container' style={{minHeight : "100vh"}}>
      <center>
        <h1 style={{ color: "white" }}><b>Add New Agent</b></h1>

      </center>
      <form>
       
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

          <div style={{ flex: 1, marginRight: '20px' }}>

            <label className="form-label">Agent Code</label>
            <input type="number" className="form-control" ref={agentCode} required />

            <label className="form-label">Qualification</label>
            <input type="text" className="form-control" ref={qualification} required />

            <label className="form-label">UserName</label>
            <input type="text" className="form-control" ref={UserName} required />

            <label className="form-label">Name</label>
            <input type="text" className="form-control" ref={name} required />
          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label">Email</label>
            <input type="text" className="form-control" ref={email} required />

            <label className="form-label">Address</label>
            <input type="text" className="form-control" ref={address} required />

            <label className="form-label">Password</label>
            <input type="password" className="form-control" ref={password} required />


            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" ref={confirmPassword} required />

          </div>
          </div>
          <button type="submit" onClick={(e) => {
           
            { validationCheck(e).then((validated) => {
              console.log("value of insde validation function" , validated);
              if (validated) {
              
                console.log("calling handleadd");
                Add(e)
                navigateObject(`/admindashboard/viewAgent`)
              } 
            })
            return
            
          } }}className="btn btn-success">Add Agent</button>
         
      </form>
    </div>
  )
}

export default AddAgent