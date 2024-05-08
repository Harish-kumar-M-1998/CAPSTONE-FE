// components/QuoteTab.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const QuoteTab = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://capstone-be-den4.onrender.com/api/quote/quote');
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
    <div>
      <h2 className="text-center my-3" >Quotes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table striped bordered hover>
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
      )}
    </div>
  );
};

export default QuoteTab;
