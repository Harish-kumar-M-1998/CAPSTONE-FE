import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Bookingscreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [service, setService] = useState(null);
  const { serviceid } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedDate = searchParams.get('date');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

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
        // Navigate back to home page when there's an error
        navigate('/');
      }
    };

    fetchServiceDetails();

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setUsername(user.username);
    }
  }, [serviceid, navigate]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if the user has already booked the service for the selected date
      const existingBookingResponse = await axios.get(`http://localhost:3000/api/bookings/bookings/checkAvailability`, {
        params: {
          serviceId: serviceid,
          serviceDate: selectedDate
        }
      });
  
      if (existingBookingResponse.data.length > 0) {
        // If there is an existing booking, show an error message and return
        setError(<h3 className='text-center my-5' style ={{color:'blue'}}>'You have already booked this service for the selected date'</h3>);
        setLoading(false);
        return;
      }
  
      // Assuming the booking data structure and API endpoint
      const bookingData = {
        username,
        serviceType: service.name,
        serviceId: serviceid,
        serviceDate: selectedDate,
        totalAmount: service.price,
        transactionId: '1234', // You can set this later when payment is implemented
        status: 'booked'
      };
      // Assuming the API endpoint for booking creation
      const response = await axios.post('http://localhost:3000/api/bookings/bookings', bookingData);
      console.log(response.data); // Log the created booking
      setLoading(false);
      // Show success toast message
      toast.success('Booking successful! Redirecting to payment page...');
      // Redirect to payment page after 3 seconds
      setTimeout(() => {
        navigate('/payment'); // Replace '/payment' with your actual payment page route
      }, 3000);
    } catch (err) {
      setError('Error creating booking');
      setLoading(false);
      console.error('Error creating booking:', err);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Service Name:</strong> {service.name}</p>
              <p><strong>Service Date:</strong> {selectedDate}</p>
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
                  {/* Call handleSubmit when Pay Now button is clicked */}
                  <button className="btn btn-primary" onClick={handleSubmit}>Pay Now</button>
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
