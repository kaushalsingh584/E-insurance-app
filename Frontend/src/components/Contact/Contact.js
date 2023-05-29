import React from 'react'
import "./Contact.css"

const Contact = () => {
  return (
    <div className='contacthm' style={{minHeight: "100vh"}}>
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="cardcon">
        <h2>Kaushal Singh</h2>
        <a href="https://www.instagram.com/johndoe"><i className="fa fa-instagram"></i></a>
      </div>
      <div className="cardcon">
        <h2>Vandana Patidar</h2>
        <a href="https://www.instagram.com/janesmith"><i className="fa fa-instagram"></i></a>
      </div>
    </div>

  </div>
  )
}

export default Contact