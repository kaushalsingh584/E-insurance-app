import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router';
import validator from "validator";

function Marketing() {

  const navigateObject = useNavigate()

  const recipient = useRef();
  const msgBody = useRef();
  const subject = useRef();
  const token = localStorage.getItem('token')
  const username = jwtDecode(token).sub
  const role = jwtDecode(token).roles



  const handleEmailSend = async (e) => {
    const data = {
      recipient: recipient.current.value,
      msgBody: msgBody.current.value,
      subject: subject.current.value
    }
    const resp = await axios.post(`http://localhost:8080/app/sendMail`,
      data,
      {
        headers:
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    ).catch((err) => {
      alert(err.message)
      return

    })

    console.log("response ", resp);
    return
  }

  const validateEmail = (e) => {
    e.preventDefault()
    console.log("recipient");
    if (recipient.current.value.trim() == "" || subject.current.value.trim() =="" || msgBody.current.value.trim() == "")
      {
        alert("Please fill all fields !!")
        return false;
      }
      if(validator.isEmail(recipient.current.value) )
     {
      // setMessage("Thank you");
      console.log("email ok");
      return true
    } else {
      alert("Please, enter valid Email!")
      return false
    }
    

  }
  return (
    <>
      <div className='container mt-4' style={{ minHeight: "100vh" }}>
        <center style={{ color: "white" }}><h1>SEND MAIL</h1></center>
        {/* <form>
          <div className="mb-6">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" cols="50" ref={recipient} />

          </div>
          <div className="mb-6">
            <label htmlFor="exampleInputPassword1" className="form-label">Subject</label>
            <input type="text" className="form-control" cols="50" ref={subject} />
          </div>
          <div className="mb-6">
            <label htmlFor="exampleInputPassword1" className="form-label" align="center">Message</label><br></br>
            <textarea id="w3review" name="w3review" rows="4" cols="50" ref={msgBody} />
          </div>

          <button type="submit" className="btn btn-primary" onClick={(e) => {
            if (validateEmail(e) == true) {
              handleEmailSend(e)
              alert("Mail sended successfully!!")
              navigateObject(`/admindashboard/${username}/${role}`)
            }
            else
              return

          }}>Submit</button>
        </form> */}
        <form>

          <div class="col-sm-12">
            <label for="input-field-1" class="form-label">Send To</label>
            <input type="text" class="form-control" id="input-field-1" ref={recipient} />

            <label for="input-field-2" class="form-label">Subject</label>
            <input type="text" class="form-control" id="input-field-2" ref={subject} />
            <br />

            <label for="input-field-3" class="form-label">Message</label>
            <textarea class="form-control" id="input-field-3" rows="3" ref={msgBody}></textarea>
            <br />
            <br />

            <button  className="btn btn-primary" onClick={(e) => {
              if (validateEmail(e) == true) {
                handleEmailSend(e)
                alert("Mail sended successfully!!")
                navigateObject(`/agentdashboard/${username}/${role}`)
              }

              return

            }}>Submit</button>

          </div>
        </form>
      </div>
    </>
  )
}

export default Marketing