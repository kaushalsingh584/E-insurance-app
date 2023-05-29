import React, { useEffect, useRef, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = () => {
  const navigateObject = new useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("kaushal");
  const token = useRef("")


  const handleMyLogin = async (e) => {
    e.preventDefault();

    if (username === "" && password === "") {
      alert("Username or Password is empty");
      return;
    }

    console.log(username, password);

    const response = await axios
      .post(
        `http://localhost:8080/login`,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err);
        // console.log("status " ,err.response.status);
        if(err.response.status  === 400)
          alert("Invalid Username")
        else 
        alert(err.response.data);
        return;
      });

    // if (!response.data) {
    //   alert("Login Failed");
    //   return
    // }
    console.log("logged in!!");
    // console.log(response.headers.authorization.slice(7));
    // if(response.data.)
    token.current = response.headers.authorization.slice(7);
    // console.log("set token done");
    // console.log(token.current);
    // console.log("set 1!");
    // console.log(token.current);
    const role = jwt_decode(token.current).roles;

    console.log("set 2!");
    // console.log(temp);
    console.log("passs 1!!");
    const response2 = await axios
    .get(`http://localhost:8080/${role}/${username}`, {
      headers: {
        Authorization: `Bearer ${token.current}`,
      },
    })
    .catch((err) => {
      alert(err.message);
    });

    // console.log(response2.data);
    
    if( response2.data.user.status ==  false)
    {
      alert("user does not exist");
      return
    }
    localStorage.setItem('token',token.current)
    localStorage.setItem('data',JSON.stringify(response2.data))
    console.log("token ",JSON.parse(localStorage.getItem('data')))


    console.log("pass 2!!");
    if (role === "admin") {
      navigateObject(
        `/admindashboard/${username}/${role}`);
    }
    else if (role === "agent") {
      navigateObject(
        `/agentdashboard/${username}/${role}`
      );
      return
    }
    else if (role === "customer") {
      navigateObject(
        `/customerdashboard/${username}/${role}`
      );
      return
    }
    else if (role === "employee") {
        navigateObject(
         `/employeedashboard/${username}/${role}`
       );
       return
     }
  };
  return (
    <>
    <div className='loginhm' style={{ minHeight: "100vh" }}>
      <div className="login-form" style={{minHeight: "100vh"}}>
        
        <form>
          <h2>Login</h2>
          
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username"  onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button onClick={handleMyLogin}>Login</button>
        </form>
      </div>
    </div>
    </>
  )
}


export default Login