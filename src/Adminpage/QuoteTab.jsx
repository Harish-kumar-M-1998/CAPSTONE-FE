import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import LoadingComponent from '../message/LoadingComponent';
import ErrorPage from '../message/ErrorPage';

const QuoteTab = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://capstone-be-den4.onrender.com/api/quote/quote',{
          headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
      });
        setQuotes(response.data);
      } catch (err) {
        setError('Error fetching quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="quote-tab-container">
      <h2 className="text-center my-3">Quotes</h2>
      {loading ? (
        <p><LoadingComponent /></p>
      ) : error ? (
        <p><ErrorPage error ={error}/></p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Availability</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote, index) => (
                <tr key={quote._id}>
                  <td>{index + 1}</td>
                  <td>{quote.name}</td>
                  <td>{quote.email}</td>
                  <td>{quote.phone}</td>
                  <td>{quote.service}</td>
                  <td>{quote.availability}</td>
                  <td>{new Date(quote.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default QuoteTab;
