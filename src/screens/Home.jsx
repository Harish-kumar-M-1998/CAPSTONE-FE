import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'; // Import Link from React Router
import HeaderContent from '../components/HeaderContent';
import WhyUsSection from '../components/WhyUsSection';
import DatePicker from 'react-datepicker'; // Import DatePicker from react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles

const Home = () => {
  const [cleaningServices, setCleaningServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Add state for selected date

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

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date state
    if (date) {
      const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      console.log(formattedDate); // Print formatted date in the console
    }
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
      <WhyUsSection />
      <h2 className="d-flex justify-content-center my-5" style={{color :'#6495ED '}}>Cleaning Services</h2>


      <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      placeholderText="Select Date"
      dateFormat="dd-MM-yyyy"
      className="form-control" // Add Bootstrap class for styling
      style={{ marginTop: '20px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    />


      <div className="row my-3">
        {cleaningServices.map(service => (
          <div key={service._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm" style={{ transition: 'transform .2s' }}>
              {service.image && (
                <img src={service.image} className="card-img-top" alt={service.name} />
              )}
              <div className="card-body">
                <h5 className="card-title" style={{color :'#1A4480'}}>{service.name}</h5>
                <p className="card-text">{service.description}</p>
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
            <img src={selectedService.image} alt={selectedService.name} className="img-fluid" />
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
