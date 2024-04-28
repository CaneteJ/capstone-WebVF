import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './AdminPage.css';
import { getRenderPropValue } from 'antd/es/_util/getRenderPropValue';

const FetchAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'agents'));
        const agentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAgents(agentsList);
      } catch (error) {
        console.error('Error fetching agents:', error);

      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="sidebar"  >
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
          <a href="AdminPage" style={{ color: 'white', textDecoration: 'none'}}>
            Home
          </a>
        </p>
        <p>
          <a href="FetchEstablishment" style={{ color: 'white', textDecoration: 'none' }}>
            Establishment List
          </a>
        </p>
        <p>
          <a href="FetchParkingUsers" style={{ color: 'white', textDecoration: 'none' }}>
            Parking Seeker List
          </a>
        </p>
      </div>
      <div className="main-content">
      <h1 className="pending" ClassName="pending" style={{marginTop: '5%', textAlign: 'center', fontWeight: 'bold' }}>Agents Account</h1>
        <div className="project-list"  style={{overflowY: 'scroll',marginTop: '5%', height: '25%', width: '70%', borderWidth: 10}}>
          {agents.length > 0 ? (
            <ul>
              {agents.map((agent, index) => (
                <React.Fragment key={agent.id}>
                  <li className="w3-bar">
                    <span className="w3-bar-item w3-button w3-white w3-xlarge w3-right"></span>
                    <img
                      src={agent.profileImageUrl || '/default-avatar.png'}
                      alt={agent.profileImageUrl}
                      className="w3-bar-item w3-circle"
                      style={{ width: '85px' }}
                    />
                    <div className="w3-bar-item">
                      <span className="w3-large">
                        Name: {'\t'}
                        {agent.firstName} {agent.lastName}
                      </span>
                      <br />
                      <span className="w3-span-sub">
                        Location: {'\t'}
                        {agent.address}
                      </span>
                      <br />
                      <span className="w3-span-sub">
                        E-mail: {'\t'}
                        {agent.email}
                      </span>
                      <br />
                      <span className="w3-span-sub">
                        Management: {'\t'}
                        {agent.managementName}
                      </span>
                    </div>
                  </li>
                  {index < agents.length - 1 && <hr />} { }
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <p>No agents found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchAgents;