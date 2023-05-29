import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'


const BuyPolicy = () => {
    const navigateObject = new useNavigate()
    const insurnceRef = useRef(0)
    const schemeRef = useRef(0)
    const token = localStorage.getItem('token')
    const username = jwtDecode(token).sub
    const [insuranceData, setinsuranceData] = useState([])
    const [profitRatio, setProfitRatio] = useState()
    const [schemeData, setSchemeData] = useState([])
    const totalPremiumLeft = useRef()
    const totalPremiumAmountRef = useRef()
    const status = true
    const durationRef = useRef()
    const profitRatioRef = useRef()
    const premiumTypeRef = useRef()

    const schemeDataRef = useRef()
    const maxtermRef = useRef(1)
    const mintermRef = useRef(0)
    const maxAmountRef = useRef(0)
    const minAmountRef = useRef(0)
    const minaAgeRef = useRef(0)
    const maxAgeRef = useRef(0)

    const [data, setData ] = useState([])


    const insurnceId = useParams().insuranceId
    const schemeId = useParams().schemeId
    console.log("insurance id: ",insurnceId,"scheme id", schemeId);

    // handle profit ratio by making a method

    let response = {}

    useEffect(() => {
        console.log("use effect comes into effect");
        getAllInsurancePlans()
    }, [])
    const getAllRespectiveSchemes = async (e) => {

        console.log("inside the scheme function ", insurnceRef.current.value);
        const insuranceplanid = insurnceRef.current.value;
        console.log(insuranceplanid);
        const response = await axios.get(`http://localhost:8080/insuranceplan/getbyid/${insuranceplanid}`,
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
        // response.data.forEach(element => {
        //     if(element.insuranceId === insurnceRef.current.value)
        //     setSchemeData(element.scheme)
        // });
        // console.log(response.data);
        console.log("data of scheme");
        setSchemeData(response.data.schemes)
        // console.log("scheme data " ,schemeData);
        // console.log("details inside ",schemeData.details);
        // console.log("maxi ",schemeData.details.maxiInvestmentTime);
        // maxtermRef.current = (schemeData.details)
        // mintermRef.current.value = (response.data.schemes.details.miniInvestmentTime)
        // maxAmountRef.current.value = (response.data.schemes.details.maxiAmount)
        // minAmountRef.current.value = (response.data.schemes.details.miniAmount)
        // maxAgeRef.current.value = (response.data.schemes.details.minAge)
        // minaAgeRef.current.value = (response.data.schemes.details.maxAge)

        // console.log(maxtermRef,minaAgeRef,maxAmountRef,minAmountRef);

    }
    const getAllInsurancePlans = async (e) => {

        response = await axios.get(`http://localhost:8080/insuranceplan/getall`,
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

    const handleMyForm = async (e) => {

        e.preventDefault()
        const insurnce = insurnceRef.current.value
        const scheme = JSON.parse(schemeRef.current.value)
        console.log(scheme.details);
        const schemeDetails = scheme.details
        console.log("scheme wala ", schemeDetails.maxiAmount);
        console.log("Profit Ratio wala ", schemeDetails.profitRatio);
        const totalPremiumAmount = totalPremiumAmountRef.current.value
        const totalPremiumLeft = totalPremiumAmountRef.current.value
        // let profitRatio = profitRatioRef.current.value
        const duration = durationRef.current.value
        const premiumType = premiumTypeRef.current.value

        maxtermRef.current = (schemeDetails.maxiInvestmentTime)
        mintermRef.current = (schemeDetails.miniInvestmentTime)
        maxAmountRef.current = (schemeDetails.maxiAmount)
        minAmountRef.current = (schemeDetails.miniAmount)
        maxAgeRef.current = (schemeDetails.minAge)
        minaAgeRef.current = (schemeDetails.maxAge)
        profitRatioRef.current = (schemeDetails.profitRatio)
        console.log(maxtermRef, minaAgeRef, maxAmountRef, minAmountRef,profitRatioRef.current);

        console.log(insurnce, totalPremiumAmount, minAmountRef, maxAmountRef, "term", mintermRef, maxtermRef);

        let profitRatio =  schemeDetails.profitRatio

        if (!(totalPremiumAmount <= maxAmountRef.current && totalPremiumAmount >= minAmountRef.current)) {
            alert("TotalPremiumAmount should be between " + minAmountRef.current + " and " + maxAmountRef.current)
            return
        }


        if (!(duration <= maxtermRef.current && duration >= mintermRef.current)) {
            alert("Duration should be between " + mintermRef.current + " and " + maxtermRef.current)
            return
        }
        
        console.log("final valuess---------------------------------------------------");
        console.log(username, premiumType, duration, profitRatio, totalPremiumAmount, totalPremiumLeft, status);
        response = await axios.post(`http://localhost:8080/purchasedinsurance/buyInsurance/${username}/${scheme.schemeId}`, JSON.stringify({ premiumType, duration, profitRatio, totalPremiumAmount, totalPremiumLeft, status }),
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
        if (!response.data) {
            alert("Data not Found ! try again later")
            return
        }
        console.log("done!!!", response);
        alert("Your have successfullly bought the Insurance ")
        navigateObject(`/customerdashboard/purchased/${username}`)


    }
    // const handleSchemeDetails = async (e) => {
    //     // e.preventDefault()
    //     console.log(schemeRef.current);
    //     const scheme = JSON.parse(schemeRef.current.value)
    //     const schemeDetails = scheme.details
    //     console.log("scheme wala ", schemeDetails.maxiAmount)
    //     profitRatioRef.current = schemeDetails.profitRatio
    //     // maxtermRef.current = (schemeDetails.maxiInvestmentTime)
    //     // mintermRef.current = (schemeDetails.miniInvestmentTime)
    //     // maxAmountRef.current = (schemeDetails.maxiAmount)
    //     // minAmountRef.current = (schemeDetails.miniAmount)
    //     console.log("pr ", schemeDetails.profitRatio);
    //     // maxAgeRef.current = (schemeDetails.minAge)
    //     // minaAgeRef.current = (schemeDetails.maxAge)
    //     return
    //     // SetDuration = durationRef.current.value
    // }
    const insuranceOptions = insuranceData.map((insurance, index) => {

        return (
            <> 
            {console.log(insurance.insuranceType == insurnceId)}
            { insurance.status === true && (
            <option key={insurance.insuranceId} value={insurance.insuranceId} selected= {insurance.insuranceType == insurnceId}>{insurance.insuranceType} </option>)}
            </>
        )
    })

    const schemeOptions = schemeData.map((scheme, index) => {
        return (
            <>{ scheme.status === true && (
            <option key={scheme.schemeId} value={JSON.stringify(scheme)}> {scheme.name} </option>)}
            </>
        )
    })

    const getSchemeDetails = (flag)=>{
        if(flag){
        const scheme = JSON.parse(schemeRef.current.value)
        console.log("hi------------------------------",scheme);
        console.log("inside getschemedetails",scheme.details.maxiAmount,scheme.details.miniAmount);
        const schemeContraintDetails = [{
            maxAmount : scheme.details.maxiAmount,
            minAmount : scheme.details.miniAmount,
            minTerm : scheme.details.miniInvestmentTime,
            maxTerm : scheme.details.maxiInvestmentTime,
            minAge :  scheme.details.miniAge,
            maxAge :  scheme.details.maxiAge,
            age : JSON.parse(localStorage.getItem('data')).age
        }]
        setData(schemeContraintDetails)
        // console.log("data length",flag, data.length);
        if( !(schemeContraintDetails[0]["age"]>= schemeContraintDetails[0]["minAge"] && schemeContraintDetails[0]["age"] <= schemeContraintDetails[0]["maxAge"] )){
        alert("You are not eligible to buy it")
        return
        }
        }
        else{
            setData([])
        }
        
    }
    const schemeConsData= data.map((item,index)=>{
        
        return (    
            <ul style={{color : "white"}}>
                <li>Total Premium Amount Premium amount should be between {item.minAmount} and {item.maxAmount}</li>
                <li>Duration should be between {item.minTerm} and {item.maxTerm} </li>
                {!(item.age <= item.maxAge && item.age >= item.minAge)?
                <li>Your age should be between {item.minAge} and {item.maxAge}, But your age is {item.age} </li> : ""}
            </ul>


        )
    })

    // const validationCheck =  (e) => {
    //     e.preventDefault()
    //     if (premiumTypeRef.current.value.trim() == "" ||
    //         durationRef.current.value.trim() == "" ||
    //         totalPremiumAmountRef.current.value.trim() == "" ||
    //         schemeRef.current.value.trim() == "" ||
    //         insurnceRef.current.value.trim() == "" ) {
    //         alert("Please fill all fields !!")
    //         return false
    //     }

    //     // more validations
       
    //     return true;

    // }

    return (
        <>
            <div className='container' style={{ minHeight: "100vh" }}>
                <h1>BuyPolicy</h1>
                <form>


                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label>InsuranceType</label>
                            <select className="form-select" aria-label="Default select example" onChange={(e)=>{getAllRespectiveSchemes(e)
                           getSchemeDetails(false)
                            }} ref={insurnceRef} defaultValue={insurnceId} required>
                                <option value={0} >Choose Insurnace Plan </option>
                                {insuranceOptions}
                            </select>
                            <br />
                            <br />
                            <label>Scheme Type</label>
                            <select className="form-select" aria-label="Default select example" onChange={getSchemeDetails} ref={schemeRef} defaultValue={schemeId} required>
                                <option value={0} >Choose Scheme </option>
                                {schemeOptions}
                            </select>
                            <br />

                            <label htmlFor="input3">Premium Type</label>
                            <select className="form-select" aria-label="Default select example" required ref={premiumTypeRef}>
                                <option value={"Yearly"}>yearly</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>


                            <div className="form-group">
                                <label htmlFor="username">duration:</label>
                                <input type="number" id="username" name="username" ref={durationRef} required />
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="username">profitRatio:</label>
                                <input type="number" id="username" name="username" value={profitRatioRef} required />
                            </div> */}

                            <div className="form-group">
                                <label htmlFor="input3">Total Premium Amount</label>
                                <input type="number" id="input3" name="input3" ref={totalPremiumAmountRef} required/>
                                {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                            </div>
                        </div>

                    </div>
                    <br/>
                    {/* <div class="row">
                      
                            <small class="text-muted"> Duration should be between {mintermRef.current} and {maxtermRef.current}</small>
                            <small class="text-muted"> Total Premium Amount should be between {minAmountRef.current} and {maxAmountRef.current}</small>

                      
                    </div> */}

                   

                    <br/>
                    {schemeConsData}
                    <br/>
                 
                    <button type = "submit" onClick={(e) => handleMyForm(e)} disabled= {data.length != 0 && !(data[0]["age"]>= data[0]["minAge"] && data[0]["age"] <= data[0]["maxAge"] )} >Buy Policy</button>
                </form>
                   
            </div>
        </>
    )
}

export default BuyPolicy