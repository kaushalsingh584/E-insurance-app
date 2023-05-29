import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewCommission = () => {

    const username = JSON.parse(localStorage.getItem('data')).user.username
    const token = localStorage.getItem('token')
    const [commissionData, setCommissionData] = useState([])
    const getAllAgents = async () => {
        console.log("------------------", username);
        const response = await axios.get(`http://localhost:8080/agent/${username}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }
        )
            .catch((err) => {
                alert("Error");
                return;
            });

        setCommissionData(response.data.records)
        console.log(response.data.records);
    }
    useEffect(() => {
        getAllAgents()
    }, [])

    const commissionRows = commissionData.map((record, index) => {
        return (
            <>
                <tr style={{ color: 'white' }}>

                    <td>{record.commissionId}</td>
                    {/* <td>{record.insuranceAcc}</td> */}
                    <td>{record.customer}</td>
                    <td>{record.insuranceType}</td>
                    <td>{record.schemeName}</td>
                    <td>{record.commPercent}</td>
                    <td>{record.commAmount}</td>
                    <td>{record.commType}</td>
                    <td>{record.created_at}</td>
                </tr>
            </>
        )
    })
    return (
        <>
            <div className='container mt-4' style={{ minHeight: "100vh", height: '400px', overflowX: 'scroll', backgroundColor: 'rgba(20, 20, 20, 0.95)' }}>
                <p style={{ color: 'white' }}><h1> Commission Record</h1></p>
                <table class="table" style={{ overflow: "hidden" }}>
                    <thead>
                        <tr style={{ color: 'coral' }}>
                            <th scope="col">ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Insurance Type</th>
                            <th scope="col">Scheme Name</th>
                            <th scope="col">Commission (%)</th>
                            <th scope="col">Commission Amount</th>
                            <th scope="col">commission Type</th>
                            <th scope="col">Timestamp</th>
                       
                           
                        </tr>
                    </thead>
                    <tbody>
                        {commissionRows}
                    </tbody>
                </table>
            </div>


        </>

    )
}

export default ViewCommission