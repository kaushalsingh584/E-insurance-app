import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function AddScheme() {
    const schName = useRef();
    const newRegComm = useRef();
    const installComm = useRef();
    const description = useRef();
    const statusRef = useRef();
    const minAmount = useRef();
    const maxAmount = useRef();
    const minInvestTime = useRef();
    const maxInvestTime = useRef();
    const minAge = useRef();
    const maxAge = useRef();
    const profitRatio = useRef();
    const insurnceRef = useRef();
    const token = localStorage.getItem('token')
    const navigateObject = new useNavigate();


    const [insuranceData, setinsuranceData] = useState([]);

    useEffect(() => {
        console.log("use effect comes into effect ---add scheme");
        getAllInsurancePlans()
    }, [])


    const getAllInsurancePlans = async (e) => {
        const response = await axios.get(`http://localhost:8080/insuranceplan/getall`,
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
        console.log(response);
        setinsuranceData(response.data)

    }

    const insuranceOptions = insuranceData.map((insurance, index) => {
        return (
            <option key={insurance.insuranceId} value={insurance.insuranceId}>{insurance.insuranceType} </option>
        )
    })

    const validationCheck = async (e) => {
        e.preventDefault()
        if (maxAge.current.value.trim() == "" ||
            minAge.current.value.trim() == "" ||
            maxInvestTime.current.value.trim() == "" ||
            minInvestTime.current.value.trim() == "" ||
            maxAmount.current.value.trim() == "" ||
            minAmount.current.value.trim() == "" ||
            installComm.current.value.trim() == "" ||
            newRegComm.current.value.trim() == "" ||
            schName.current.value.trim() == "" ||
            description.current.value.trim() == "") {
            alert("Please fill all fields !!")
            return false
        }

        // more validations
        console.log("validation", "max", maxInvestTime.current.value.trim(), minInvestTime.current.value.trim());
        if (maxAge.current.current <= minAge.current.value.current) {
            alert("max age should greater than min age")
            return false;
        }

        if (maxInvestTime.current.current <= minInvestTime.current.current) {
            console.log("inside investtime", 9 > 21);
            console.log(maxInvestTime.current <= minInvestTime.current);
            alert("max time should greater than min time")
            return false;

        }
        // alertString += "max time should greater than min time\n"

        if (maxAmount.current.current <= minAmount.current.current) {
            alert("max amount should greater than min amount")
            return false;
        }

        if (Boolean(schName.current.value.match(/^[a-zA-z ]*$/)) == false) {
            alert("Scheme name cannot contain numbers aur special symbols")
            return false;
        }
        if (Boolean(description.current.value.match(/^[a-zA-z0-9.,() ]*$/)) == false) {
            alert("description cannot container numbers aur special symbols")
            return false;
        }

        // console.log("value of alert string", alertString);
        // if (!(alertString == "")) {
        //     alert(alertString)
        //     return false
        // }
        const response = await axios.get(`http://localhost:8080/scheme/getallschemeName`,
            {
                headers:
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        ).catch((err) => {
            alert("Could not get scheme data")
            return false
        })
        console.log(response);
        let SchemeNameData = response.data
        if (SchemeNameData.includes(schName.current.value)) {
            alert("Scheme name already exist !!")
            return false
        }
        return true;

    }

    const AddScheme = async (e) => {
        e.preventDefault();
        const data = {
            name: schName.current.value,
            newRegisterCommission: newRegComm.current.value,
            installmentCommission: installComm.current.value,
            description: description.current.value,
            status: 1,
            details: {
                miniAmount: minAmount.current.value,
                maxiAmount: maxAmount.current.value,
                miniInvestmentTime: minInvestTime.current.value,
                maxiInvestmentTime: maxInvestTime.current.value,
                miniAge: minAge.current.value,
                maxiAge: maxAge.current.value,
                profitRatio : profitRatio.current.value,
            }
        };
        console.log(" inside add scheme data ", data);

        const response = await axios.post(`http://localhost:8080/scheme/save/${insurnceRef.current.value}`,
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
        alert("scheme added successfully")

        navigateObject(`/admindashboard/viewscheme`)
    }

    return (
        <>
            <div>
                <center>
                    <h1 style={{ color: "white" }}><b>Add New Scheme</b></h1>

                </center>
                <form>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>

                            <label>InsuranceType</label>
                            <select className="form-select" aria-label="Default select example" ref={insurnceRef} >
                                <option value={0} >Choose Insurnace Plan </option>
                                {insuranceOptions}
                            </select>
                            <br />
                            <label className="form-label">Scheme Name</label>
                            <input type="text" className="form-control" ref={schName} />

                           
                            <label className="form-label">New Registration Commission</label>
                            <input type="number" className="form-control" ref={newRegComm} />

                            <label className="form-label">Minimum Amount</label>
                            <input type="number" className="form-control" ref={minAmount} />
                            <label className="form-label">Minimum Invest Time</label>
                            <input type="number" className="form-control" ref={minInvestTime} />
                            <label className="form-label">Minimum Age</label>
                            <input type="number" className="form-control" ref={minAge} />

                           
                            <br/>
                        <label className="form-label">Description</label>

                        </div>
                        <div style={{ flex: 1 }}>


                            <label className="form-label" >Status</label>
                            <select className="form-select" aria-label="Default select example" ref={statusRef} >
                                <option value={true} >True </option>
                                <option value={false} >False </option>
                            </select>
                            <br />

                            <label className="form-label">Profit Ratio</label>
                            <input type="number" className="form-control" ref={profitRatio} />
                            <label className="form-label">Installment Commission</label>
                            <input type="number" className="form-control" ref={installComm} />

                            <label className="form-label">Maximum Amount</label>
                            <input type="number" className="form-control" ref={maxAmount} />

                            <label className="form-label">Maximum Invest Time</label>
                            <input type="number" className="form-control" ref={maxInvestTime} />

                            <label className="form-label">Maximum Age</label>
                            <input type="number" className="form-control" ref={maxAge} />

                           
                           
                        </div>
                      
                        <textarea class="form-control" id="input-field-3" rows="6" ref={description}></textarea>

                    </div>
                    <br />
                    <button type="submit" onClick={(e) => {
                        {
                            validationCheck(e).then((validated) => {
                                console.log("value of insde validation function", validated);
                                if (validated) {

                                    console.log("calling handleadd");
                                    AddScheme(e)

                                }
                                else {
                                    e.preventDefault()
                                }
                            })


                        }
                    }} className="btn btn-success">Add Scheme</button>
                </form>
            </div>
        </>
    )
}

export default AddScheme