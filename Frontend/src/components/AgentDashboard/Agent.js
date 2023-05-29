import React from 'react'
import "./admin.css"
import Card from '../../Layout/Card/Card'
import { Link, useParams } from 'react-router-dom';
import img1 from '../../assets/C1.png';
import img2 from '../../assets/C2.png';
import img3 from '../../assets/C3.jpeg';
import img4 from '../../assets/C4.png';
import img5 from '../../assets/C5.jpg';
import img6 from '../../assets/C6.jpeg';


function Agent() {
    const param = useParams();
   const username = param.username;
   const role = param.role;
    const cardsData = [
        {
          id:1,
          image: img1,
          title: 'Profile',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/agentdashboard/profile/${username}`
        },
        {
          id: 2,
          image: img2,
          title: 'Marketing',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: `/agentdashboard/marketing`
        },
        {
          id: 2,
          image: img2,
          title: 'Customer',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/agentdashboard/viewcustomers`
        },
        {
          id: 2,
          image: img2,
          title: 'View Commission',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link:`/agentdashboard/viewcommission`
        }
         ];
  return (
    <>
      {/* <div>
        <h1>Welcome back {username}</h1>
    </div> */}
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

export default Agent