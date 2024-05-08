import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assume the user information is stored in localStorage
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.username) {
          const response = await axios.get(`https://capstone-be-den4.onrender.com/api/bookings?username=${user.username}`);
          setBookings(response.data);
        }
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`https://capstone-be-den4.onrender.com/api/bookings/${bookingId}`, { status: 'Cancelled' });
      // After cancellation, refetch the bookings to update the UI
      fetchUserBookings();
    } catch (err) {
      localStorage.setItem('cancelBookingError', 'Error cancelling booking');
      // Reload the page
      window.location.reload();
      fetchUserBookings();
    }
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <Table striped bordered hover>
          <thead className='text-center'>
            <tr>
              <th>Serial No</th>
              <th>Service Type</th>
              <th>Service Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td className='text-center'>{index + 1}</td>
                <td>{booking.serviceType}</td>
                <td>{new Date(booking.serviceDate).toLocaleDateString()}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status !== 'Cancelled' && (
                    <Button style ={{float :'right'}} variant="danger" onClick={() => handleCancelBooking(booking._id)}>Cancel</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BookingsTab;
