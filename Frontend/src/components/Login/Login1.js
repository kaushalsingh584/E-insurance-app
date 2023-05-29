import React, { useEffect, useRef, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = () => {
  const navigateObject = new useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const username = useRef()
  // const password = useRef()
  const [token, setToken] = useState("kaushal")


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
        alert(err.message);
        return;
      });

    // if (!response.data) {
    //   alert("Login Failed");
    //   return
    // }
    console.log("logged in!!");
    console.log(response.headers.authorization.slice(7));
    setToken(response.headers.authorization.slice(7));
    console.log("set token done");
    console.log(token);
    console.log("set 1!");
    console.log(token);
    const role = jwt_decode(token).roles;

    console.log("set 2!");
    console.log(token);
    console.log("passs 1!!");
    const response2 = await axios
    .get(`http://localhost:8080/${role}/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      alert(err.message);
    });

    console.log(response2.data);
    localStorage.setItem('token',token)
    localStorage.setItem('data',JSON.stringify(response2.data))
    console.log("token ",JSON.parse(localStorage.getItem('data')).adminId)


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
    else {
        navigateObject(
         `/employeedashboard/${username}/${role}`
       );
       return
     }
  };
  return (
    <>
    <div className='loginhm'>
      <div className="login-form">
        
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