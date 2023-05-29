import React from 'react'
// import { Link } from "react-router-dom";
import "./footer.css"
export const Footer = () => {
  return (
    <>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-company">
          <h4>EInsurance</h4>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
        </div>
      </div>
    </footer>
    </>
  )
}
