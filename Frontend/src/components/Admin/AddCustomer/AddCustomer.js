import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import axios from 'axios';
import moment from 'moment/moment';
import validator from "validator";

function AddCustomer() {
    const navigateObject = new useNavigate()
    const token = localStorage.getItem('token');
    const agentid = useRef()
    const [agents, setAgents] = useState([])
    const param = useParams();
    // const username = param.username;
    // const role = param.role;
    const userRef = useRef();
    const nameRef = useRef();
    const passRef = useRef();
    const cpassRef = useRef();
    const emailRef = useRef();
    const addRef = useRef();
    const stateRef = useRef();
    const statusRef = useRef();
    const DOBRef = useRef();
    const cityRef = useRef();
    const phoneRef = useRef();
    const pincodeRef = useRef();
    const ageRef = useRef();
  


    const nomineeRef = useRef();
    const nomineeRelationRef = useRef();

    const AddNewCustomer = async (e) => {
        e.preventDefault()
        console.log("yeh aaya toh badia nhu toh ...");
        // console.log(nameRef.current.value);
        console.log(userRef.current.value);
        console.log(passRef.current.value);
        // console.log(roleRef.current.value);
        console.log(emailRef.current.value);
        // console.log(nameRef.current.value);
        console.log(agentid.current.value);
        const agent = agentid.current.value
        const data = {

            DOB: DOBRef.current.value,
            phone: phoneRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            pincode: pincodeRef.current.value,
            nominee: nomineeRef.current.value,
            nomineeRelation: nomineeRelationRef.current.value,
            age : ageRef.current.value,
            user: {
                name: nameRef.current.value,
                username: userRef.current.value,
                password: passRef.current.value,
                role: "customer",
                email: emailRef.current.value,
                address: addRef.current.value,
                status: true,
            },
        };


        console.log("inside add customer --------------------");
        console.log(userRef.current.value, DOBRef.current.value,);
        let response = await axios.post(`http://localhost:8080/customer/save/${agent}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        )
            .catch((err) => {
                alert(err.message);
                return;
            });



        alert("customer added !!")

    }

    const getAllAgent = async () => {
        const resp = await axios.get(`http://localhost:8080/agent/getall`,
            {
                headers:
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        ).catch((err) => {
            alert("error occured")
            return
        })

        console.log(resp.data);
        setAgents(resp.data)
        console.log(resp.data);
    }


    const agentsRows = agents.map((agent, index) => {
        // var status="true"
        // if(agent.user.status===false){
        //   status="false"
        // }
        console.log("map called");
        return (
            <option key={agent.agentId} value={agent.agentId}> {agent.user.username} </option>
        )
    })
    
    const validationCheck = async(e)=>{
        e.preventDefault();
        let alertString = ""
        console.log("inside add funcion ========================");
        try {
    
          console.log(userRef.current.value);
          console.log(nameRef.current.value);
          console.log(passRef.current.value);
          console.log(cpassRef.current.value);
          console.log(emailRef.current.value);
          console.log(stateRef.current.value);
          console.log(DOBRef.current.value);
          console.log(addRef.current.value);
          console.log(cityRef.current.value);
          console.log(cityRef.current.value);
          console.log(phoneRef.current.value);
          console.log(pincodeRef.current.value);
          console.log(nomineeRef.current.value);
          console.log(nomineeRelationRef.current.value);
    

      
          if (!(userRef.current.value.trim() != "" &&
          nameRef.current.value.trim() != "" &&
          passRef.current.value.trim() != "" &&
          emailRef.current.value.trim() != "" &&
          stateRef.current.value.trim() != "" &&
          DOBRef.current.value.trim() != "" &&
          cityRef.current.value.trim() != "" &&
          phoneRef.current.value.trim() != ""&&
          pincodeRef.current.value.trim() != "" &&
          addRef.current.value.trim() != "" &&
          nomineeRef.current.value.trim() != "" &&
          nomineeRelationRef.current.value.trim() != "")) {
            alert("Please fill all fields !!")
            return false
          }
          
          if(passRef.current.current != cpassRef.current.current)
          {
            alert("Password & Comfirm Password do not match")
            return false
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
          console.log(emailsData.data,"email : ",emailRef.current.value);
          if (emailsData.data.includes(emailRef.current.value)) {
            alertString += "Email already exists\n";
          }
          console.log("phase-2");
          if (Boolean(userRef.current.value.match(/^[a-zA-z0-9_]*$/)) == false) {
            alertString += "Username cannot contain special symbols\n"
          }
          console.log("phase-3");
        //   password.current.value.trim() == confirmPassword.current.value.trim()
        //   if (!(passRef.current.value.trim() != "")) {
        //     alertString += "Both Password and Confirm password do not match\n"
        //   }
          if (Boolean(nameRef.current.value.match(/^[a-zA-z ]*$/)) == false) {
            alertString += "Name cannot container numbers aur special symbols\n"
          }
          console.log("phase-4");
          if (Boolean(addRef.current.value.match(/^[a-zA-z0-9_, ]*$/)) == false) {
            alertString += "Address cannot contain special symbols\n"
          }

          if (Boolean(stateRef.current.value.match(/^[a-zA-z ]*$/)) == false) {
            alertString += "State cannot container numbers aur special symbols\n"
          }
          if (Boolean(cityRef.current.value.match(/^[a-zA-z ]*$/)) == false) {
            alertString += "city cannot contain special symbols\n"
          }
          console.log(phoneRef.current.value.length ) //6
          if ((phoneRef.current.value.length != 10) || (Boolean(phoneRef.current.value.match(/^[0-9]*$/)) == false) ) {
            alertString += "phone should container string of numbers of length 10\n"
          }
          console.log("phase-2phone");
          if ((Boolean(pincodeRef.current.value.match(/^[0-9]*$/)) == false  )|| pincodeRef.current.value.length != 6) {
            alertString += "Pincode should be of length 6\n"
          }
          if (Boolean(nomineeRef.current.value.match(/^[a-zA-z ]*$/)) == false) {
            alertString += "Name cannot container numbers aur special symbols\n"
          }

          console.log("phase-pincode");
          if (validator.isEmail(emailRef.current.value)) {
            // setMessage("Thank you");
            console.log("email ok");
          } else {
            alertString += "Please, enter valid Email!";
          }
        //   if(DOBRef)
        //   {
        //     const date = moment(DOBRef, "YYYY-MM-DD");
        //     const formattedDate = date.format("dd-MM-yyyy");
        //     DOBRef.current = formattedDate
        //   }
    
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

    useEffect(() => {
        console.log("it comes into action --add customer");
        getAllAgent();

    }, [])

    return (
        <>
            <form>
            <h2><p style={{ color: 'white' }}>Add Customer</p></h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                    <div style={{ flex: 1, marginRight: '20px' }}>

                    <label className="form-label" >USERNAME</label>
                    <input type="text" className="form-control" ref={userRef} />

                    <label className="form-label">NAME</label>
                    <input type="text" className="form-control" ref={nameRef} />

                    <label className="form-label">DOB</label>
                    <input type="text" className="form-control" ref={DOBRef} />

                    <label className="form-label">Phone</label>
                    <input type="number" className="form-control" ref={phoneRef} />

                    <label className="form-label">EMAIL</label>
                    <input type="email" className="form-control" ref={emailRef} />

                    <label className="form-label" >Select Agent </label>
                    <select className="form-select" aria-label="Default select example" ref={agentid}>
                    {agentsRows}
                    </select><br/>

                    <label className="form-label">City</label>
                    <input type="text" className="form-control" ref={cityRef} />

                    <label className="form-label">Age</label>
                    <input type="text" className="form-control" ref={ageRef} />

                  
                    </div>
                    <div style={{ flex: 1 }}>
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" ref={stateRef} />

                    <label className="form-label">Pincode</label>
                    <input type="number" className="form-control" ref={pincodeRef} />

                    <label className="form-label">ADDRESS</label>
                    <input type="text" className="form-control" ref={addRef} />

                    <label className="form-label">Nominee</label>
                    <input type="text" className="form-control" ref={nomineeRef} />

                    <label className="form-label">Nominee Relation</label>
                    <select className="form-select" aria-label="Default select example" ref={nomineeRelationRef}>
                    <option value={"Brother"}>Brother</option>
                    <option value={"Father"}>Father</option>
                    <option value={"Mother"}>Mother</option>
                    </select>

                    <label className="form-label">Status</label>
                    <select className="form-select" aria-label="Default select example" ref={statusRef}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                    </select>
                    <br/>
                   

                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" ref={passRef} />

                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" ref={cpassRef} />

                    </div>
                </div>
                {/* <label className="form-label" >Select Agent </label>
                <select className="form-select" aria-label="Default select example" ref={agentid}>
                    {agentsRows}
                </select><br></br> */}


                <button type='submit' onClick={(e) =>{
           
           { validationCheck(e).then((validated) => {
             console.log("value of insde validation function" , validated);
             if (validated) {
             
               console.log("calling handleadd");
               AddNewCustomer(e)
               navigateObject(`/admindashboard/viewcustomer`)
             } 
           })
           return
           
         } }} className="btn btn-success">Add</button>
            </form>

        </>
    )
}

export default AddCustomer