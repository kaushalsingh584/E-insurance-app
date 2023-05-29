
import React, { useState } from 'react'
import "./navbar.css";
import jwtDecode from 'jwt-decode';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";


export const Navbar = () => {
  const navigateObject = new useNavigate()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const token = localStorage.getItem('token')
  const user = jwtDecode(token)
  const role = user.roles
  const username = user.sub
  console.log("inside navbar ----------------------------");
  console.log(user);
  console.log("username ", username, "roles", role);

  const handleLogut = (e) => {
    localStorage.removeItem('data')
    localStorage.removeItem('token')
    alert("You are logged out !!")
    navigateObject(`/`)
  }
  if (role === "admin") {

    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          EInsurance
        </a>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >

          <ul>
            <li>
              <a href={`/admindashboard/${username}/${role}`}>Dashboard</a>
            </li>
            {/* <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li> */}

            <li>
              <Link to="/" onClick={handleLogut}>
                Logout
              </Link>
            </li>

            <li>
              <a href="" >hi,{username}</a>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
  else if (role === "customer") {

    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          EInsurance
        </a>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >

          <ul>
            <li>
              <a href={`/customerdashboard/${username}/${role}`}>Dashboard</a>
            </li>
            {/* <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li> */}
            <li>
              <Link to="/" onClick={handleLogut}>
                Logout
              </Link>
            </li>
            <li>
              <a href="" >hi,{username}</a>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
  else if (role === "agent") {
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          EInsurance
        </a>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >

          <ul>
            <li>
              <a href={`/agentdashboard/${username}/${role}`}>Dashboard</a>
            </li>
            {/* <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li> */}
            <li>
              <Link to="/" onClick={handleLogut}>
                Logout
              </Link>
            </li>
            <li>
              <a href="" >hi,{username}</a>
            </li>



          </ul>
        </div>
      </nav>
    );
  }
  else if(role === "employee")
  {
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          EInsurance
        </a>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >

          <ul>
            <li>
              <a href={`/employeedashboard/${username}/${role}`}>Dashboard</a>
            </li>
            {/* <li>
              <a href="/">Home</a>
            </li> */}
            {/* <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li> */}

            <li>
              <Link to="/" onClick={handleLogut}>
                Logout
              </Link>
            </li>

            <li>
              <a href="" >hi,{username}</a>
            </li>

          </ul>
        </div>
      </nav>
    );
  }


}
