import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'react-tabs/style/react-tabs.css';
import BookingsTab from '../Adminpage/BookingsTab'; // Assuming the BookingsTab component is in a separate file
import ServicesTab from '../Adminpage/ServicesTab';
import AddServicesTab from '../Adminpage/AddServicesTab';
import UsersTab from '../Adminpage/UsersTab';
import QuoteTab from '../Adminpage/QuoteTab';
import './Admin.css';

const Admin = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTabListOpen, setIsTabListOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Call initially to set state based on initial window size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleTabList = () => {
    setIsTabListOpen(!isTabListOpen);
  };

  return (
    <div className="admin-container" style={{ backgroundImage: `url(https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1715597294~exp=1715600894~hmac=d19587c2a68906da2c84f39be30fe5fe21cec0adc37814b8f0c6c8afc7562952&w=900)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="admin-title">Admin Panel</h1>
      <div className="admin-tabs-container">
        <Tabs style={{ backgroundImage: `url(https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1715597294~exp=1715600894~hmac=d19587c2a68906da2c84f39be30fe5fe21cec0adc37814b8f0c6c8afc7562952&w=900)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {isSmallScreen && (
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleTabList}
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}
          <TabList style={{ display: isSmallScreen && !isTabListOpen ? 'none' : 'block' }}>
            <Tab>Bookings</Tab>
            <Tab>Services</Tab>
            <Tab>Add Services</Tab>
            <Tab>Users</Tab>
            <Tab>Quote</Tab>
          </TabList>

          <div className="admin-tab-content">
            <TabPanel>
              <BookingsTab />
            </TabPanel>

            <TabPanel>
              <ServicesTab />
            </TabPanel>

            <TabPanel>
              <AddServicesTab />
            </TabPanel>

            <TabPanel>
              <UsersTab />
            </TabPanel>

            <TabPanel>
              <QuoteTab />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
