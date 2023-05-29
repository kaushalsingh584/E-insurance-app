import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const DetailPurchasedIns = () => {
    const purchasedInsurnaceId = useParams().id
    const status = true
    const token = localStorage.getItem('token')
    const username = jwtDecode(token).sub
    console.log(username);
    const [amount, setAmount] = useState(0)
    const [insuranceType, setInsuranceType] = useState("")
    const [scheme, setScheme] = useState("")
    const [datecreated, setDatecreated] = useState("")
    const [maturityDate, setMaturityDate] = useState("")
    const [totalPremiumAmountLeft,setTotalPremiumLeft] = useState("")
    const [sumAssured,setSumAssured] = useState("")
    const [profitRatio,setProfitRatio] = useState("")
    const [duration,setDuration] = useState("")
    const [totalPremiumAmount,setTotalPremiumAmount] = useState("")
    const [premiumType,setPremiumType] = useState("")
    const [installmentAmount ,setInstallmentAmount] = useState("")
    const [payment ,setPayment] = useState([])


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
        setMaturityDate(response2.data.maturityDate)
        setTotalPremiumLeft(response2.data.totalPremiumLeft)
        setSumAssured(response2.data.sumAssured)
        setProfitRatio(response2.data.profitRatio)
        setDuration(response2.data.duration)
        setTotalPremiumAmount(response2.data.totalPremiumAmount)
        setPremiumType(response2.data.premiumType)
        setInstallmentAmount(response2.data.installmentAmount)

        setPayment(response2.data.payment)
        console.log(amount);

    }

    const paymentRows = payment.map((data, index) => {

        return (
          <tr key={data.paymentId} style={{ color: 'white' }}>
      
            <td>{data.paymentId}</td>    
            <td>{data.amount}</td>
            <td>{ data.status === true ? "success" : "Pending"}</td>
            {/* <td>{data.createdAt}</td> */}

          </tr>
        )
      })
    useEffect(() => {

        getPurchasedInsuranceInfo()
    },[])
  return (
    <>

        <div className='container mt-4' style={{ minHeight: "100vh" }}>
       
        
        <form>
        <h2><p style={{ color: 'white' }}>Purchased Insuance Detail</p></h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
     
        <div style={{ flex: 1, marginRight: '20px' }}>
          <label htmlFor="input1">InsuranceType</label>
          <input type="text" id="input1" name="input1" value = {insuranceType}/><br /><br />

          <label htmlFor="input2">Policy</label>
          <input type="text" id="input2" name="input2"  value = {scheme}/><br /><br />

          <label htmlFor="input3">Date Created</label>
          <input type="text" id="input3" name="input3" value = {datecreated}/><br /><br />

          <label htmlFor="input3">Total PremiumAmount Left</label>
          <input type="text" id="input3" name="input3" value = {totalPremiumAmountLeft}/><br /><br />

          <label htmlFor="input3">Total Premium Amount</label>
          <input type="text" id="input3" name="input3" value = {totalPremiumAmount}/><br /><br />

          <label htmlFor="input3">Premium Type</label>
          <input type="text" id="input3" name="input3" value = {premiumType}/><br /><br />

          {/* Add more inputs here */}
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="input4">maturity Date</label>
          <input type="text" id="input4" name="input4"  value = {maturityDate} /><br /><br />

          <label htmlFor="input5">Profit Ratio</label>
          <input type="text" id="input5" name="input5" value = {profitRatio}/><br /><br />

          <label htmlFor="input6">Sum Assured</label>
          <input type="text" id="input6" name="input6" value = {sumAssured}/><br /><br />

          <label htmlFor="input6">Duration</label>
          <input type="text" id="input6" name="input6" value = {duration}/><br /><br />

          <label htmlFor="input6">Installment Amount</label>
          <input type="text" id="input6" name="input6" value = {installmentAmount}/><br /><br />

          {/* Add more inputs here */}
        </div>
        
      </div>
      <label htmlFor="input6">Payments</label>
      <table className="table" style={{ overflow: "hidden" }}>
        <thead>
          <tr style={{ color: 'coral' }}>
          <th scope="col">Payment ID</th>
            <th scope="col">Installment Amount</th>
            <th scope="col">status </th>
            </tr>
        </thead>
        <tbody>
          {paymentRows}
        </tbody>
      </table>
    </form>
        </div>
      
      
    </>
  
  )
}

export default DetailPurchasedIns