import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BookingsTab from '../Adminpage/BookingsTab'; // Assuming the BookingsTab component is in a separate file
import ServicesTab from '../Adminpage/ServicesTab';
import AddServicesTab from '../Adminpage/AddServicesTab';
import UsersTab from '../Adminpage/UsersTab';
import QuoteTab from '../Adminpage/QuoteTab';
import './Admin.css'
const Admin = () => {
  return (
    <div className="admin-container" style ={{backgroundColor  :'#D6EAF8 '}}>
      <h1 className="text-center my-3">Admin Panel</h1>
      <Tabs>
        <TabList>
          <Tab>Bookings</Tab>
          <Tab>Services</Tab>
          <Tab>Add Services</Tab>
          <Tab>Users</Tab>
          <Tab>Quote</Tab>
        </TabList>

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
      </Tabs>
    </div>
  );
};

export default Admin;
