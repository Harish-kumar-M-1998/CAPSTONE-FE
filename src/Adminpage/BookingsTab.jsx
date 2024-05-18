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
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://capstone-be-den4.onrender.com/api/bookings/bookings',{
          headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
      });
        setBookings(response.data);
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this booking.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`https://capstone-be-den4.onrender.com/api/bookings/${bookingId}`,{
          headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
      });
        // Update the bookings list after successful deletion
        const updatedBookings = bookings.filter(booking => booking._id !== bookingId);
        setBookings(updatedBookings);
        Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
      }
    } catch (err) {
      setError('Error deleting booking');
    }
  };

  return (
    <div className="table-responsive" style={{ maxWidth: '100%', overflowX: 'auto' ,
      background: 'linear-gradient(to bottom right, #a0c4ff, #ffffff)'
    
     } }>
      <h2 className="text-center my-3">Bookings</h2>
      {loading ? (
        <p><LoadingComponent /> </p>
      ) : error ? (
        <p><ErrorPage error={error}/></p>
      ) : (
        <Table striped bordered hover style={{ animation: 'fadeIn 1s ease-in-out' }}>
          <thead className='text-center'>
            <tr>
              <th>Serial No</th>
              <th>Username</th>
              <th>Service Type</th>
              <th>Service Date</th>
              <th>Total Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Action</th> {/* Add a column for delete button */}
            </tr>
          </thead>
          <tbody className='text-center' style={{ animation: 'fadeIn 1s ease-in-out' }}>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.username}</td>
                <td>{booking.serviceType}</td>
                <td>{new Date(booking.serviceDate).toLocaleDateString()}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.transactionId}</td>
                <td>{booking.status}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteBooking(booking._id)}>Delete</Button>
                </td> {/* Add delete button */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BookingsTab;
