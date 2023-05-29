import React from 'react'
import Card from '../../Layout/Card/Card'
import { Link, useParams } from 'react-router-dom'
import img1 from '../../assets/C1.png';
import img2 from '../../assets/C2.png';
import img3 from '../../assets/C3.jpeg';
import img4 from '../../assets/C4.png';
import img5 from '../../assets/C5.jpg';
import img6 from '../../assets/C6.jpeg';
import jwtDecode from 'jwt-decode';

const CustomerDashboard = () => {

    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const user={
        username : decoded.sub,
        role : decoded.roles

    }
    const cardsData = [
        {
          id: 1,
          image: img1,
          title: 'Profile',
          // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/customerdashboard/profile/${user.username}`
        },
        {
          id: 2,
          image: img2,
          title: 'Purchased Policy',
          // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/customerdashboard/purchased/${user.username}`
        },
        {
          id: 3,
          image: img3,
          title: 'Buy Policy',
          // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/customerdashboard/buypolicy`
        },
        {
          id: 3,
          image: img3,
          title: 'View Insurance Plans',
          // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/customerdashboard/viewinsurance`
        },
        {
          id: 3,
          image: img3,
          title: 'View Schemes',
          // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/customerdashboard/viewscheme`
        }
      ];
  return (
    <>
     <div>
        <h1>Welcome back {user.username}!!</h1>
    </div>
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

export default CustomerDashboard