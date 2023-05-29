import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'


const Payment = () => {
    const navigateObject = new useNavigate()
    const purchasedInsurnaceId = useParams().id
    const status = true
    const token = localStorage.getItem('token')
    const username = jwtDecode(token).sub
    console.log(username);
    const [amount, setAmount] = useState(0)
    const [insuranceType, setInsuranceType] = useState("")
    const [scheme, setScheme] = useState("")
    const [datecreated, setDatecreated] = useState("")

    const handlePayment = async (e) => {
        e.preventDefault()
        const response = await axios.post(`http://localhost:8080/payment/save/${purchasedInsurnaceId}`,
            JSON.stringify({ status, amount }),
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

        if (response.status === 200) {
                alert(`Payment of amount ${amount} is successfully made`)
               navigateObject(`/customerdashboard/purchased/${username}`)
        }
        navigateObject(`/customerdashboard/purchased/${username}`)

        console.log("response", response.data);
    }

    const getPurchasedInsuranceInfo = async (e) => {
        const response2 = await axios.get(`http://localhost:8080/purchasedinsurance/${purchasedInsurnaceId}`,
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
        console.log("response", response2.data);
        setAmount(response2.data.installmentAmount)
        setDatecreated(response2.data.datecreated)
        setInsuranceType(response2.data.insuranceType)
        setScheme(response2.data.insuranceScheme)

        console.log(amount);
    }
    useEffect(() => {

        getPurchasedInsuranceInfo()
    })
    return (

        <>
            <h1>payment Gateway</h1>
            <form >
                <div className="mb-3" >
                    <label for="exampleInputEmail1" className="form-label">Account No</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue ={purchasedInsurnaceId} disabled style={{color : 'black'}}/>
                   
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">insurance Type</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={insuranceType} disabled style={{color : 'black'}} />
                   
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Scheme Type</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={scheme} disabled style={{color : 'black'}}/>
                   
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Data Created</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={datecreated} disabled style={{color : 'black'}}/>
                   
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Installment Amount</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={amount} disabled style={{color : 'black'}}/>
                   
                </div>

                <button type="submit" className="btn btn-success" onClick={handlePayment}>Make Payment</button>
            </form>
        </>
    )
}

export default Payment