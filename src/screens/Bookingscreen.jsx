import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

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

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://capstone-be-den4.onrender.com/api/cleaningservices/getCleaningServiceById/${serviceid}`);
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

  const handleSubmit = async (token) => {
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

    try {
      setLoading(true);
      setError(null);

      // Check if the user has already booked the service for the selected date
      const existingBookingResponse = await axios.get(`https://capstone-be-den4.onrender.com/api/bookings/bookings/checkAvailability`, {
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
      const response = await axios.post('https://capstone-be-den4.onrender.com/api/bookings/bookings', bookingData);
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
                  <StripeCheckout
                    amount={service.price * 100} // Amount in cents
                    token={handleSubmit} // Submit callback
                    currency='INR'
                    stripeKey="pk_test_51PDekiSGfzm40G05nKXfRVf4kCmx3sxrnOQMoA9Emand84QnAxlkX8tLhf4Ulgrtil3u81BiXxuAuCgToPnW6J3e00loFWquYF"
                  />
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
