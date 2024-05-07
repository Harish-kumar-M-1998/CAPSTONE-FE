import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/bookings/bookings');
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
      await axios.delete(`http://localhost:3000/api/bookings/${bookingId}`);
      // Update the bookings list after successful deletion
      const updatedBookings = bookings.filter(booking => booking._id !== bookingId);
      setBookings(updatedBookings);
    } catch (err) {
      setError('Error deleting booking');
    }
  };

  return (
    <div>
      <h2>Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table striped bordered hover>
          <thead>
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
          <tbody>
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
