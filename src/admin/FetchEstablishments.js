import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './AdminPage.css';

const FetchEstablishments = () => {
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "establishments"));
        const establishmentsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEstablishments(establishmentsList);
      } catch (error) {
        console.error("Error fetching establishments:", error);
        
      }
    };

    fetchEstablishments();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="admin-container">
          <img
            src="customer.jpg"
            alt="Admin"
            className="admin-pic"
            style={{ width: '50px', marginRight: '10px' }}
          />
          <span className="admin-text">Admin</span>
        </div>

        <p>
          <a href="AdminPage" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </a>
        </p>
        <p>
          <a href="FetchParkingUsers" style={{ color: 'white', textDecoration: 'none' }}>
            Parking Seeker List
          </a>
        </p>
        <p>
          <a href="FetchAgents" style={{ color: 'white', textDecoration: 'none' }}>
            Agents List
          </a>
        </p>
      </div>
      <div className="main-content">
      <h1 className="pending" style={{marginTop: '5%', textAlign: 'center', fontWeight: 'bold',}}>Establishments Accounts</h1>
        <div className="project-list" style={{overflowY: 'scroll',marginTop: '5%', height: '25%', width: '70%'}}>
         
          {establishments.length > 0 ? (
            <ul>
              {establishments.map((establishment, index) => (
                <React.Fragment key={establishment.id}>
                  <li className="w3-bar">
                    <span className="w3-bar-item w3-button w3-white w3-xlarge w3-right"></span>
                    <img
                      src={establishment.profileImageUrl || '/default-avatar.png'}
                      alt={establishment.managementName}
                      className="w3-bar-item w3-circle"
                      style={{ width: '85px' }}
                    />
                    <div className="w3-bar-item">
                      <span className="w3-large">
                        Establishment: {'\t'}
                        {establishment.managementName}</span>
                      <br />
                      <span className="w3-span-sub">
                        Parking Location: {'\t'}
                        {establishment.companyAddress}</span>
                      <br />
                      <span className="w3-span-sub">
                        Approved on:{'\t'}
                        {establishment.createdAt?.seconds
                          ? new Date(establishment.createdAt.seconds * 1000).toLocaleDateString()
                          : 'Date not available'}
                      </span>
                    </div>
                  </li>
                  {index < establishments.length - 1 && <hr />} { }
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <p>No establishments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchEstablishments;