import React from 'react'
import Card from '../../Layout/Card/Card'
import { Link } from 'react-router-dom';
import img1 from '../../assets/C1.png';
import img2 from '../../assets/C2.png';
import img3 from '../../assets/C3.jpeg';
import img4 from '../../assets/C4.png';
import img5 from '../../assets/C5.jpg';
import img6 from '../../assets/C6.jpeg';
import jwtDecode from 'jwt-decode';
export const Employee = () => {

    const token = localStorage.getItem('token')
    const username = jwtDecode(token).sub
    const cardsData = [
        {
          id: 1,
          image: img1,
          title: 'Profile',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/employeedashboard/profile/${username}`
        },
        
        {
          id: 3,
          image: img3,
          title: 'View Agent',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/employeedashboard/viewAgent`
        },
      
        {
          id: 4,
          image: img5,
          title: 'View Customer',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/employeedashboard/viewcustomer`
        },
        
       
        {
          id: 6,
          image: img4,
          title: 'View InsurancePlans',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/employeedashboard/viewinsurance`
        },
        {
          id: 6,
          image: img4,
          title: 'View Schemes',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/employeedashboard/viewscheme`
        }
        
      ];
  return (
    <>

    <div className="card-grid" style={{ minHeight: "100vh" }}>
      {cardsData.map(card => (
        <Link to={card.link} style={{ textDecoration: 'none' }}>
            <Card
            key={card.id}
            image={card.image}
            title={card.title}
            // description={card.description}
            buttonText={card.buttonText}
            />
        </Link>
      ))}
    </div>
    </>
  )
}
