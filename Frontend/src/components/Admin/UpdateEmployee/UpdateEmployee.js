import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"


const UpdateEmployee = () => {
  const navigateObject = useNavigate()
  const id = useParams().id
  const [customerStatus, setCustomerStatus] = useState()
  const [customerAddress, setCustomerAddress] = useState()
  const [customerEmail, setCustomerEmail] = useState()
  const [customerName, setCustomerName] = useState()
  const token = localStorage.getItem('token')

  const getUserInfo = async (e) => {
    let response = await axios.get(`http://localhost:8080/employee/getbyid/${id}`,
      {
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

    // console.log(response.data);
    setCustomerAddress(response.data.user.address)
    setCustomerEmail(response.data.user.email)
    setCustomerName(response.data.user.name)
    console.log(customerAddress);

  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log("inside update");

    // const address = customerAddress
    // const email = customerEmail
    // const name = customerName
    // const status = customerStatus

    const data = {
      name: customerName,
      address: customerAddress,
      email: customerEmail,
      status: customerStatus
    };

    console.log("new values ", data, id);
    const response = await axios.put(
      `http://localhost:8080/employee/update/${id}`,
      data,
      {
        headers:
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    )
      .catch((err) => {
        console.log(err);
        return;
      });
    navigateObject(`/admindashboard/viewemployee`)
  }
  useEffect(() => {

    console.log("use effect comes into effect ---update customer");
    getUserInfo()
  }, [])
  return (
    <>
      <div className="container" style={{minHeight : "100vh"}}>
        <h1>Update Employee</h1>
        <form >
          <div className="form-group" >
            <label htmlFor="username">Name:</label>
            <input type="text" id="username" name="username" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Email:</label>
            <input type="text" id="username" name="username" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Address:</label>
            <input type="text" id="username" name="username" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} required />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Status
            </label>
            <select
              id="inputState"
              class="form-select"
              onChange={(e) => setCustomerStatus(e.target.value)}
            >
              <option selected>Select</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div >
            <br />
            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => { handleUpdate(e) }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>

  )
}

export default UpdateEmployee