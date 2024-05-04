import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Bookingscreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [service, setService] = useState(null); 

  const { serviceid } = useParams();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3000/api/cleaningservices/getCleaningServiceById/${serviceid}`);
        setService(response.data); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching service details');
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceid]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render booking information once service details are fetched
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Booking Details</h2>
      
      <div className="row">
      
        <div className="col-md-6">
        
          {service && (
            
            <img src={service.image} alt={service.name} className="img-fluid" />
          )}
        </div>
        <div className="col-md-6 booking-details-box p-4 rounded shadow-sm">
          {service && (
            <>
              <h4>Service Details</h4>
              <p><strong>Name:</strong> {service.name}</p>
              <p><strong>Service Name:</strong> {service.name}</p>
              <p><strong>Service Date:</strong> {/* Add service date here */}</p>
              <p><strong>Availability:</strong> {service.availability}</p>
              <p><strong>Pricing:</strong> ${service.price}</p>
              <p><strong>Description:</strong> {service.description}</p>
              <p><strong>Location:</strong> {service.location}</p>
              <div className="row mt-4">
                <div className="col-md-12">
                  <h3>Amount</h3>
                  <p>Total Amount: ${service.price}</p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12" style={{ textAlign: 'right' }}>
                  <Link to="/payment" className="btn btn-primary">Pay Now</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookingscreen;
