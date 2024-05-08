import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert, Row, Col, Button } from 'react-bootstrap';

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/users/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserToAdmin = async (userId) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${userId}`, { isAdmin: true });
      // Update the users list after successful update
      const updatedUsers = users.map(user => {
        if (user._id === userId) {
          return { ...user, isAdmin: true };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (err) {
      setError('Error updating user to admin');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      // Remove the deleted user from the users list
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h2 className="text-center my-3">Users</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {users.map((user, index) => (
            <Col key={user._id} lg={4} md={6} sm={12} className="mb-3">
              <Card className="user-card" style={{ height: '100%' }}>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                  <Card.Text>{user.isAdmin ? 'Admin' : 'User'}</Card.Text>
                  {!user.isAdmin && ( // Display the buttons only if the user is not an admin
                    <Button variant="success" className="mr-2" onClick={() => updateUserToAdmin(user._id)}>Make Admin</Button>
                  )}
                  <Button style ={{float :'right'}} variant="danger" onClick={() => deleteUser(user._id)}>Delete User</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UsersTab;
