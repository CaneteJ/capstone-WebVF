import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc, getDoc,setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import './AdminPage.css';
import { Link } from 'react-router-dom';
function AdminPage() {
    const [pendingAccounts, setPendingAccounts] = useState([]);
    const [establishments, setEstablishments] = useState([]);
    const [summaryCardsData, setSummaryCardsData] = useState([]);
    const [parkingSeeker, setParkingSeeker] = useState([]);
    const [agent, setAgent] = useState ([]);

    useEffect(() => {
        const fetchParkingUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "user"));
            const userList = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setParkingSeeker(userList);
          } catch (error) {
            console.error("Error fetching parking seeker:", error);
            
          }
        };
    
        fetchParkingUsers();
      }, []);

      useEffect(() => {
        const fetchAgents = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "agents"));
            const agentsList = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAgent(agentsList);
          } catch (error) {
            console.error("Error fetching agents:", error);
            
          }
        };
    
        fetchAgents();
      }, []);

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

  useEffect(() => {
    setSummaryCardsData([
        { title: 'Pending Accounts  ', value: `${pendingAccounts.length} Account Pending`, imgSrc: 'pending.png' },
        { title: 'Establishment Accounts', value: `${establishments.length} Registered`, imgSrc: 'check.png'},
        { title: 'Parking Seekers', value: `${parkingSeeker.length} Registered`, imgSrc: 'check.png'},
        { title: 'Agents Accounts', value: `${agent.length} Registered`, imgSrc: 'check.png'}
        
    ]);
}, [pendingAccounts]);

    useEffect(() => {
        const fetchPendingAccounts = async () => {
          const q = query(collection(db, "pendingEstablishments"));
          const querySnapshot = await getDocs(q);
          const accounts = [];
          querySnapshot.forEach((doc) => {
            accounts.push({ id: doc.id, ...doc.data() });
          });
          setPendingAccounts(accounts);
        };
      
        fetchPendingAccounts();
      }, []);

    const handleApprove = async (accountId) => {
        const accountRef = doc(db, "pendingEstablishments", accountId);
        const accountSnapshot = await getDoc(accountRef);
        const accountData = accountSnapshot.data();
      
    
        await setDoc(doc(db, "establishments", accountId), {
          ...accountData,
          createdAt: new Date(),
          isApproved: true
        });
      
        await deleteDoc(accountRef);
      
        setPendingAccounts(pendingAccounts.filter(account => account.id !== accountId));
      };

      const handleDecline = async (accountId) => {
      }
      
      
    return (
        <div>
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
  <p><a href ='FetchEstablishments' style={{ color: 'white', textDecoration: 'none' }}> Establishment List</a></p>
  <p><a href ='FetchParkingUsers' style={{ color: 'white', textDecoration: 'none' }}> Parking Seeker List</a></p>

  <p><a href ='FetchAgents' style={{ color: 'white', textDecoration: 'none' }}> Agents List</a></p>
       
      </div>
      <div className="main-content">
        <div className="header"></div>
        <div className="summary-cards" >
          {summaryCardsData.map(card => (
            <div key={card.title} className="card">
            <img src={card.imgSrc} alt={card.title} className="card-image" />
            <div className="card-content">
              <div className="card-title">{card.title}</div>
              <div className="card-value">{card.value}</div>
            </div>
          </div>
          ))}
        </div>
        <div className="project-list">
          <h3 className='pending'>Pending Establishment Accounts</h3>
          {pendingAccounts.map(account => (
            <div key={account.id} className="pending-sub">
              <div className="info-section">
                                    <div className="title">Email</div>
                                    <div className="value">
                                    <Link to={`/email/${account.id}`}>
                                            <span className="highlight-background">{account.email}</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="title">Management name</div>
                                  
                                    <div className="value">
                                        <span className="highlight-background">{account.managementName}</span>
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="title">Contact number</div>
                                    <div class  Name="value">
                                        <span className="highlight-background">{account.managementName}</span>
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="title">Address</div>
                                    <div className="value">
                                    <span className="highlight-background">{account.companyAddress}</span>
                                </div>
                                </div>
                                <div className="info-section">
                                    <div className="title">Number of Floors</div>
                                    <div className="value">
                                    <span className="highlight-background">{account.numberOfFloors}</span>
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="title">Total Slots</div>
                                    <div className="value">
                                    <span className="highlight-background">{account.totalSlots}</span>
                                </div>
                                </div>
              <div><button onClick={() => handleApprove(account.id)} className="approve-button" style={{ fontStyle: 'bold', color: 'white', alignSelf: 'center' }}>Approve</button></div>
              <div><button onClick={() => handleDecline(account.id)} className="decline-button" style={{ fontStyle: 'bold', color: 'white', alignSelf: 'center' }}>Decline</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>       
    </div>
    );
}

export default AdminPage;
