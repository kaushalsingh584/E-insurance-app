import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";

const PurchasedInsurance = () => {

  const [purchasedPolicies, setPurchasedPolicies] = useState([])
  const [purchasedData, setPurchasedData] = useState([])
  const navigateObject = new useNavigate()

  useEffect(() => {
    console.log("use effect comes into effect");
    getAllPurchasedPolicies()
  }, [])

  const getAllPurchasedPolicies = async () => {

    const token = localStorage.getItem('token')
    const username = jwt_decode(token).sub; // edit the api after creating the api in backend
    const response = await axios
      .get(`http://localhost:8080/purchasedinsurance/findbyusername/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        alert(err.message);
      });

    console.log(response.data);
    setPurchasedData(response.data)
    // console.log("token ",JSON.parse(localStorage.getItem('data')))


  }
  const handleMakePayment = async (e) => {

    e.preventDefault()
   console.log("target value " ,e.target.innerText);
    const id = e.target.parentElement.parentElement.firstChild.innerText
    // const fifthColumn =  e.target.parentElement.parentElement.querySelector('td:nth-child(11)');
    // const amount = fifthColumn.textContent;
    // console.log(id, "5th column", fifthColumnContent);
    if (e.target.innerText === "Make Payment") {
      navigateObject(`/paymentgateway/payment/${id}`)
    } 
    else if (e.target.innerText === "View Detail")
    {
      
      navigateObject(`/purchasedInsurnace/details/${id}`)
    }
    else{
      alert("Your Policy has been claimed automatically !!")
     return
    }
    

}



const purchasedRows = purchasedData.map((data, index) => {

  return (
    <tr key={data.accountNumber} style={{ color: 'white' }}>

      <td>{data.accountNumber}</td>
      <td>{data.insuranceType}</td>
      <td>{data.insuranceScheme}</td>
      <td>{data.datecreated}</td>
      <td>{data.maturityDate}</td>
      <td>{data.premiumType}</td>
      <td>{data.totalPremiumAmount}</td>
      <td>{data.duration}</td>
      <td>{data.profitRatio}</td>
      <td>{data.sumAssured}</td>
      <td>{data.installmentAmount}</td>
      <td>{data.payment.length}</td>
      <td>{data.totalPremiumLeft}</td>
      <td><button type="button" className="btn btn-danger editButton" onClick={(e) => { handleMakePayment(e) }} >
          {data.totalPremiumLeft === 0 ? `Policy Claimed` : `Make Payment` }</button></td>
      <td><button type="button" className="btn btn-success editButton" onClick={(e) => { handleMakePayment(e) }}>View Detail</button></td>
    </tr>
  )
})

return (
  <>
    <div className='container mt-4' style={{ minHeight: "100vh" ,height: '400px', overflowX: 'scroll',backgroundColor:'rgba(20, 20, 20, 0.95)' }}>
      <p style={{ color: 'white'}}><h1>Purchased Insurance Policy</h1></p>
      <table class="table" style={{ overflow: "hidden" }}>
        <thead>
          <tr style={{ color: 'coral' }}>
            <th scope="col">Account No</th>
            <th scope="col">Insurance Type</th>
            <th scope="col">Policy </th>
            <th scope="col">Creation Date</th>
            <th scope="col">Maturity Date </th>
            <th scope="col">Premium Type</th>
            <th scope="col">Total Premium Amount </th>
            <th scope="col">Duration</th>
            <th scope="col">Profit Ratio</th>
            <th scope="col"> Sum Assured</th>
            <th scope="col"> Installment Amount</th>
            <th scope="col"> No of Installment Made</th>
            <th scope="col"> Total Premium Left</th>
          </tr>
        </thead>
        <tbody>
          {purchasedRows}
        </tbody>
      </table>
    </div>
  </>
)
}

export default PurchasedInsurance