import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import HeaderContent from '../components/HeaderContent';
import WhyUsSection from '../components/WhyUsSection';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingComponent from '../message/LoadingComponent';
import ErrorPage from '../message/ErrorPage';

const Home = () => {
  const [cleaningServices, setCleaningServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityFilter, setAvailabilityFilter] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [priceOrder, setPriceOrder] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {
    const fetchCleaningServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://capstone-be-den4.onrender.com/api/cleaningservices/getAllCleaningServices/',{
          headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
      });
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
    setSelectedDate(date);
  };

  const handleBookNow = () => {
    if (selectedService) {
      navigate(`/bookingscreen/${selectedService._id}?date=${selectedDate}`);
    }
  };

  const handleFilterByAvailability = (availability) => {
    setAvailabilityFilter(availability);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handlePriceOrderChange = (event) => {
    setPriceOrder(event.target.value);
  };

  const filteredCleaningServices = cleaningServices.filter(service => {
    if (availabilityFilter && service.availability !== availabilityFilter) {
      return false;
    }
    if (
      !searchInput ||
      service.availability.toLowerCase().includes(searchInput.toLowerCase()) ||
      service.location.toLowerCase().includes(searchInput.toLowerCase()) ||
      service.name.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return true;
    }
    return false;
  }).sort((a, b) => {
    if (priceOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (priceOrder === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="container" style={{
      background: 'linear-gradient(to bottom right, #a0c4ff, #ffffff)'
    }
    
    } >
      <HeaderContent />
      <WhyUsSection />
      <h2 className="text-center my-5" style={{ color: '#6495ED' }}>Cleaning Services</h2>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Select Date"
            dateFormat="dd-MM-yyyy"
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search by service, availability, or location"
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-3">
          <select
            value={priceOrder}
            onChange={handlePriceOrderChange}
            className="form-control"
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <Button variant="secondary" onClick={() => handleFilterByAvailability('Morning')} className="mx-2">Morning</Button>
        <Button variant="secondary" onClick={() => handleFilterByAvailability('Afternoon')} className="mx-2">Afternoon</Button>
        <Button variant="secondary" onClick={() => handleFilterByAvailability('Evening')} className="mx-2">Evening</Button>
        <Button variant="secondary" onClick={() => setAvailabilityFilter(null)} className="mx-2">All</Button>
      </div>

      <div className="row my-3">
        {filteredCleaningServices.map(service => (
          <div key={service._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm" style={{ transition: 'transform .2s' }}>
              {service.image && (
                <img src={service.image} className="card-img-top" alt={service.name} />
              )}
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#1A4480' }}>{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <Button variant="primary" onClick={() => handleShow(service)} style={{ float: 'right' }}>View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <Modal show={showModal} onHide={handleClose} dialogClassName="modal-90w">
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
            <Button variant="primary" onClick={handleBookNow}>Book Now</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
