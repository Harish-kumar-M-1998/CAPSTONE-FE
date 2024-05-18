import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import LoadingComponent from '../message/LoadingComponent';
import ErrorPage from '../message/ErrorPage';

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {
    const fetchUserBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assume the user information is stored in localStorage
       
        if (user && user.username) {
          const response = await axios.get(`https://capstone-be-den4.onrender.com/api/bookings?username=${user.username}`,{
            headers: {
                Authorization: `Bearer ${user.token}`, // Include the token in the request headers
            },
        });
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
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to cancel this booking.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!'
      });

      if (result.isConfirmed) {
        await axios.put(`https://capstone-be-den4.onrender.com/api/bookings/${bookingId}`, { status: 'Cancelled' });
        // After cancellation, refetch the bookings to update the UI
        fetchUserBookings();
        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
      }
    } catch (err) {
      localStorage.setItem('cancelBookingError', 'Error cancelling booking');
      // Reload the page
      window.location.reload();
      fetchUserBookings();
    }
  };

  return (
    <div className="table-responsive">
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Your Bookings</h2>
      {loading ? (
        <p><LoadingComponent /> </p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}><ErrorPage error ={error} /> </p>
      ) : bookings.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#333' }}>No bookings found</p>
      ) : (
        <Table striped bordered hover style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <thead className='text-center'>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
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
              <tr key={booking._id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                <td className='text-center'>{index + 1}</td>
                <td>{booking.serviceType}</td>
                <td>{new Date(booking.serviceDate).toLocaleDateString()}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status !== 'Cancelled' && (
                    <Button 
                      variant="danger" 
                      style={{ borderRadius: '20px' }} 
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </Button>
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
