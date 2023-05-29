import './App.css';
import React from 'react';
import { Home } from './components/Home/Home';
import { Navbar } from './Layout/Navbar/Navbar';
import {Footer} from './Layout/Footer/Footer';
import { Admin } from './components/Admin/Admin';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { About } from './components/About/About';
import Login from './components/Login/Login';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import ProfileCustomer from './components/CustomerDashboard/Profile/Profile';
import PurchasedInsurance from './components/CustomerDashboard/PurchasedInsurance/PurchasedInsurance';
import Payment from './components/CustomerDashboard/Payment/Payment';
import DetailPurchasedIns from './components/CustomerDashboard/DetailPurchasedIns/DetailPurchasedIns';
import BuyPolicy from './components/CustomerDashboard/BuyPolicy/BuyPolicy';
import ViewAgent from './components/Admin/ViewAgent/ViewAgent';
import AddAgent from './components/Admin/AddAgent/AddAgent';
import ViewCustomerAll from './components/Admin/ViewCustomer/ViewCustomer';
import AddCustomer from './components/Admin/AddCustomer/AddCustomer';
import Agent from './components/AgentDashboard/Agent';
import ProfileAgent from './components/AgentDashboard/Profile/Profile';
import ViewCustomer from './components/AgentDashboard/ViewCustomer/ViewCustomer';
import { BasicNav } from './Layout/BasicNav/BasicNav';
import Contact from './components/Contact/Contact';
import UpdateAgent from './components/Admin/UpdateAgent/UpdateAgent';
import AdminProfile from './components/Admin/AdminProfile/AdminProfile';
import AddPolicy from './components/Admin/AddInsurance/AddPolicy';
import AddScheme from './components/Admin/AddScheme/AddScheme';
import ViewAllInsurance from './components/Admin/ViewAllInsurance/ViewAllInsurance';
import ViewAllSchemes from './components/Admin/ViewAllSchemes/ViewAllSchemes';
import Marketing from './components/Admin/Marketing/Marketing';
import UpdateCustomer from './components/Admin/UpdateCustomer/UpdateCustomer';
import { Employee } from './components/EmployeeDashboard/Employee';
import Profile from './components/EmployeeDashboard/Profile/Profile';
import ViewCommission from './components/AgentDashboard/ViewCommission/ViewCommission';
import AddEmployee from './components/Admin/AddEmployee/AddEmployee';
import UpdateEmployee from './components/Admin/UpdateEmployee/UpdateEmployee';
import ViewEmployee from './components/Admin/ViewEmployee/ViewEmployee';
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<><BasicNav /><Home /></>} />
          <Route exact path="/login" element={<><BasicNav /><Login/></>} />
          <Route exact path="/about" element={<><BasicNav /><About/></>} />
          <Route exact path="/contact" element={<><BasicNav /><Contact/></>} />

          <Route exact path="/admindashboard/:username/:role" element={<><Navbar /><Admin/></>} />
          <Route exact path="/admindashboard/viewAgent" element={<><Navbar /><ViewAgent/></>} />
          <Route exact path="/admindashboard/addagent" element={<><Navbar /><AddAgent/></>} />
          <Route exact path="/admindashboard/viewcustomer" element={<><Navbar /> <ViewCustomerAll/></>} />
          <Route exact path="/admindashboard/addcustomer" element={<><Navbar />< AddCustomer /></>} />
          <Route exact path="/admindashboard/addcustomer" element={<><Navbar />< AddCustomer /></>} />
          <Route exact path="/admindashboard/updateAgent/:id" element={<><Navbar />< UpdateAgent /></>} />
          <Route exact path="/admindashboard/updatecustomer/:id" element={<><Navbar />< UpdateCustomer /></>} />
          <Route exact path="/admindashboard/profile/:username" element={<><Navbar /><AdminProfile/></>} />
          <Route exact path="/admindashboard/addInsurance" element={<><Navbar /><AddPolicy/></>} />
          <Route exact path="/admindashboard/addScheme" element={<><Navbar /><AddScheme/></>} />
          <Route exact path="/admindashboard/viewinsurance" element={<><Navbar /><ViewAllInsurance/></>} />
          <Route exact path="/admindashboard/viewscheme" element={<><Navbar /><ViewAllSchemes/></>} />
          <Route exact path="/admindashboard/viewemployee" element={<><Navbar /><ViewEmployee/></>} />
          <Route exact path="/admindashboard/addemployee" element={<><Navbar /><AddEmployee/></>} />
          <Route exact path="/admindashboard/updateemployee/:id" element={<><Navbar /><UpdateEmployee/></>} />
          
          <Route exact path="/customerdashboard/:username/:role" element={<><Navbar /><CustomerDashboard/></>} />
          <Route exact path="/customerdashboard/profile/:username" element={<><Navbar /><ProfileCustomer/></>} />
          <Route exact path="/customerdashboard/purchased/:username" element={<><Navbar /><PurchasedInsurance /></>} />
          <Route exact path="/customerdashboard/buypolicy" element={<><Navbar /><BuyPolicy /></>} />
          <Route exact path="/purchasedInsurnace/details/:id" element={<><Navbar /><DetailPurchasedIns /></>} />
          <Route exact path="/paymentgateway/payment/:id" element={<><Navbar /><Payment /></>} />
          <Route exact path="/customerdashboard/viewinsurance" element={<><Navbar /><ViewAllInsurance/></>} />
          <Route exact path="/customerdashboard/viewscheme" element={<><Navbar /><ViewAllSchemes/></>} />

          <Route exact path="/agentdashboard/:username/:role" element={<><Navbar /><Agent/></>} />
          <Route exact path="/agentdashboard/profile/:username" element={<><Navbar /><ProfileAgent/></>} />
          <Route exact path="/agentdashboard/viewcustomers" element={<><Navbar /><ViewCustomer/></>} />
          <Route exact path="/agentdashboard/marketing" element={<><Navbar /><Marketing/></>} />
          <Route exact path="/agentdashboard/viewcommission" element={<><Navbar /><ViewCommission/></>} />



          <Route exact path="/employeedashboard/:username/:role" element={<><Navbar /><Employee/></>} />
          <Route exact path="/employeedashboard/profile/:username" element={<><Navbar /><Profile/></>} />
          <Route exact path="/employeedashboard/viewcustomer" element={<><Navbar /> <ViewCustomerAll/></>} />
          <Route exact path="/employeedashboard/viewAgent" element={<><Navbar /><ViewAgent/></>} />
          <Route exact path="/employeedashboard/viewinsurance" element={<><Navbar /><ViewAllInsurance/></>} />
          <Route exact path="/employeedashboard/viewscheme" element={<><Navbar /><ViewAllSchemes/></>} />

  





          {/* <Route exact path="/about" element={<About/>} /> */}
          {/* <Route exact path="/insta" component={() => {
            window.location.href='https://www.instagram.com/thinkingbirdproduction';
            return null;
          }} /> */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
