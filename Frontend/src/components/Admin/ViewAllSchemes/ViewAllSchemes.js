import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import BuyPolicy from '../../CustomerDashboard/BuyPolicy/BuyPolicy';

const ViewAllSchemes = () => {
    const navigateObject = new useNavigate()
    const token = localStorage.getItem('token')
    const role = jwtDecode(token).roles
    const [isTrue, setIsTrue] = useState(true);

    const cellStyle = {
        whiteSpace: 'normal',
        wordWrap: 'break-word'
      };

    const [insuranceData, setinsuranceData] = useState([]);

    useEffect(() => {
        console.log("use effect comes into effect ---view all scheme");
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

    const updateCustomer = async (e) => {
        e.preventDefault()
        console.log(e.target.parentElement.parentElement.firstChild.innerText);
        const id = e.target.parentElement.parentElement.firstChild.innerText
        var answer = window.confirm("Are You Sure ? You really want to update status!!!");
        if (answer) {
            const response = await axios.delete(`http://localhost:8080/scheme/deletebyid/${id}`,
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
            console.log(response);
        }
        else {
            return;
        }

        if (role === "admin")
            navigateObject(`/admindashboard/viewscheme`)
        else if (role === "employeee")
            navigateObject(`/employeedashboard/viewscheme`)

    }

    const buyPolicyFromTable = (e) => {

        const schemId = e.target.parentElement.parentElement.firstChild.innerText
        const insurnceplanId = e.target.parentElement.parentElement.querySelector('td:nth-child(4)').innerText

        navigateObject(`/customerdashboard/buypolicy/${schemId}/${insurnceplanId}`)
    }

    const handlebuy = (e)=>{
        navigateObject(`/customerdashboard/buypolicy`)
    }

    const insuranceRows = insuranceData.map((insurance, index) => {

        const schemes = insurance.schemes
        return (

            <>
                {insurance.schemes.map(scheme => {
                    return (
                        <>
                            <tr key={scheme.schemeId} style={{ color: 'white' }}>

                                <td>{scheme.schemeId} </td>
                                <td>{scheme.name} </td>
                                <td style={{maxHeight: "5px", overflow: "hidden"}}>{scheme.description} </td>
                                <td >{insurance.insuranceId}</td>
                                <td >{insurance.insuranceType}</td>
                                <td>{scheme.newRegisterCommission} </td>
                                <td>{scheme.installmentCommission} </td>
                                <td>{scheme.details.profitRatio} </td>
                                <td>{scheme.details.miniAmount} </td>
                                <td>{scheme.details.maxiAmount} </td>
                                <td>{scheme.details.miniInvestmentTime} </td>
                                <td>{scheme.details.maxiInvestmentTime} </td>
                                <td>{scheme.details.miniAge} </td>
                                <td>{scheme.details.maxiAge} </td>
                                <td>{scheme.status == true ? "Active" : "InActive"}</td>
                                <td>
                                    {(role === "admin" || role === "employee") && (
                                        <button type="button" className="btn btn-danger" onClick={(e) => { updateCustomer(e) }}>Update Status</button>)}
                                    {/* {(role === "customer") && (<button type="button" className="btn btn-danger" onClick={(e) => { buyPolicyFromTable(e) }}>Buy</button>)} */}
                                </td>


                            </tr>
                        </>
                    )
                })}

            </>
        )
    })
    return (
        <>
            <div className='container' style={{ minHeight: "100vh" }} >
            <p style={{ color: 'white' }}><h1>View Schemes</h1></p>
                    {role == "admin" && (
                        <button className="float-end" onClick={(e) => {

                            navigateObject('/admindashboard/addscheme')
                        }} >add new scheme</button>)}
                    <br />
                    <br />
                <div style={{ overflowX: 'scroll', }}>
                    
                    <table class="table mt-4" style={{ overflow: "hidden", backgroundColor: 'rgba(20, 20, 20, 0.95)' }}>
                        <thead>
                            <tr style={{ color: 'coral' }}>
                                <th scope="col">ID</th>
                                <th scope="col">Scheme Type</th>
                                <th scope="col">Description of the Scheme</th>
                                <th scope="col">Insurance ID</th>
                                <th scope="col">Insurance Type</th>
                                <th scope="col">New Register Commission</th>
                                <th scope="col">Installment Commission</th>
                                <th scope="col">Profit Ratio</th>
                                <th scope="col">Min Amount</th>
                                <th scope="col">Max Amount</th>
                                <th scope="col">Min Investment Time</th>
                                <th scope="col">Max Investment Time</th>
                                <th scope="col">Mini Age</th>
                                <th scope="col">Maxi Age</th>
                                <th scope="col">Status</th>
                                {(role === "admin" || role === "employee") && (
                                    <th scope="col">Update Status</th>)}
                                {/* {(role === "customer") && (<th scope="col">Buy</th>)} */}
                            </tr>
                        </thead>
                        <tbody>
                            {insuranceRows}
                        </tbody>
                    </table>
                </div>
                {(role === "customer") && (
            <center>    <button className='btn btn-success mt-4 ' onClick={(e)=>{handlebuy(e)}}>Buy Insurance </button></center>)}
            </div>

        </>
    )
}

export default ViewAllSchemes