# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

http://localhost:3000/api/userdata/userdata


import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'; // Import Link from React Router
import HeaderContent from '../components/HeaderContent';

const Home = () => {
  const [cleaningServices, setCleaningServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchCleaningServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:3000/api/cleaningservices/getAllCleaningServices/');
        setCleaningServices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching cleaning services');
        setLoading(false);
      }
    };

    fetchCleaningServices();
  }, []);

  const handleShow = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    
    <div className="container">
    <HeaderContent />
      <h2 className="d-flex justify-content-center my-5">Cleaning Services</h2>
      <div className="row">
        {cleaningServices.map(service => (
          <div key={service._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm" style={{ transition: 'transform .2s' }}>
              {service.image && (
                <img src={service.image} className="card-img-top" alt={service.name} />
              )}
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
               {/* <ul>
                  <li>Availability: {service.availability}</li>
                  <li>Price: ${service.price}</li>
                  <li>Location: {service.location}</li>
                </ul> */}
                <Button variant="primary" onClick={() => handleShow(service)} style={{ float: 'right' }}>View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedService.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedService.image} alt={selectedService.name} className="img-fluid"/>
            <p>{selectedService.description}</p>
            <ul>
              <li>Availability: {selectedService.availability}</li>
              <li>Price: ${selectedService.price}</li>
              <li>Location: {selectedService.location}</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Link to={`/bookingscreen/${selectedService._id}`} state={{ service: selectedService }}>
              <Button variant="primary">Book Now</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
