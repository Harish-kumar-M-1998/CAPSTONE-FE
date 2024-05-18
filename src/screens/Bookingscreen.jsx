import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import ErrorPage from '../message/ErrorPage';
import LoadingComponent from '../message/LoadingComponent';

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3000/api/cleaningservices/getCleaningServiceById/${serviceid}`,{
          headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
      });
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

    
    if (user) {
      setUsername(user.username);
      setIsLoggedIn(true);
    }
  }, [serviceid, navigate]);

  const handleBookNow = () => {
    if (!username || !selectedDate) {
      // Show alert if username or selectedDate is empty
      Swal.fire({
        icon: 'warning',
        title: 'Please login and select a date',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    // If the user is logged in and date is selected, proceed with Stripe checkout
    setShowSuccess(true);
  };

  const handleSubmit = async (token) => {
    if (!selectedDate) {
      // Show alert if date is not selected
      Swal.fire({
        icon: 'warning',
        title: 'Please select a date before proceeding with Stripe payment',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  
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
        // If there is an existing booking, show a SweetAlert error message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have already booked this service for the selected date',
        });
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
        transactionId: token.id, // Token ID from Stripe
        status: 'booked'
      };
  
      // Assuming the API endpoint for booking creation
      const response = await axios.post('http://localhost:3000/api/bookings/bookings', bookingData,{
        headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the request headers
        },
    });
      console.log(response.data); // Log the created booking
      setLoading(false);
      setShowSuccess(true);
      Swal.fire({
        icon: 'success',
        title: 'Booking successful!',
        text: 'Redirecting to home...',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/home');
      });
    } catch (err) {
      setError('Error creating booking');
      setLoading(false);
      // Show alert if there's an error with booking
      Swal.fire({
        icon: 'error',
        title: 'Booking Error',
        text: 'There was an error creating the booking. Please select a date.',
      });
      console.error('Error creating booking:', err);
    }
  };
  
  if (loading) {
    return <div><LoadingComponent /> </div>;
  }

  if (error) {
    return <div> <ErrorPage /> </div>;
  }

  return (
    <div className="container mt-5" style={{ backgroundImage: `url(https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1715597294~exp=1715600894~hmac=d19587c2a68906da2c84f39be30fe5fe21cec0adc37814b8f0c6c8afc7562952&w=900)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                  {isLoggedIn && selectedDate ? (
                    // If user is logged in and date is selected, show Stripe Checkout button
                    <StripeCheckout
                      amount={service.price * 100} // Amount in cents
                      token={handleSubmit} // Submit callback
                      currency='INR'
                      stripeKey="pk_test_51PDekiSGfzm40G05nKXfRVf4kCmx3sxrnOQMoA9Emand84QnAxlkX8tLhf4Ulgrtil3u81BiXxuAuCgToPnW6J3e00loFWquYF"
                    />
                  ) : (
                    // If user is not logged in or date is not selected, show Book Now button
                    <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showSuccess && (
        <div className="alert alert-success mt-4" role="alert">
          Booking successful! Redirecting to home...
        </div>
      )}
    </div>
  );
};

export default Bookingscreen;
