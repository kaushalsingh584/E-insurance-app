import React from 'react'
import './home.css';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import img6 from '../../assets/what_insurance.jpeg';
export const Home = () => {
  // localStorage.setItem('token',"")
  // localStorage.removeItem('token')
  return (
    <>
    <div className='homeflex mt-4' style={{ minHeight: "85vh" }}>  
      <div className="cardhm">
      <img src={img6} alt="" />
      <div className="cardhmtext ">
        <h1>WHAT IS E-INSURANCE</h1><br/>
        <p>Welcome to our E-insurance company, where we provide 
          comprehensive and affordable insurance solutions for all 
          your needs. At our company, we understand that insurance 
          is an essential part of life, providing financial security 
          and peace of mind in uncertain times. That's why we're committed 
          to offering a wide range of insurance products and services 
          that are tailored to meet the unique needs of our customers. 
          Whether you're looking for home, auto, health, or life insurance, 
          our team of experienced professionals is here to help you find 
          the right coverage at the right price. With our user-friendly 
          online platform and dedicated customer support, getting the 
          insurance you need has never been easier. Thank you for choosing 
          us as your insurance partner, and we look forward to serving you!</p>
      </div>
    </div>
    {/* <div className="center">
      <Link to="/login"><button className='logbut'>Log In</button></Link>
    </div> */}
    {/* <Login/> */}
      
      
    </div>
    
    </>
  );
}
