import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import LoadingComponent from '../message/LoadingComponent';
import ErrorPage from '../message/ErrorPage';

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [updatedService, setUpdatedService] = useState({
    name: '',
    description: '',
    price: 0
  });
  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://capstone-be-den4.onrender.com/api/cleaningservices/getAllCleaningServices/',{
          headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
      });
        setServices(response.data);
      } catch (err) {
        setError('Error fetching services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setSelectedService(service);
    setUpdatedService({
      name: service.name,
      description: service.description,
      price: service.price
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedService(null);
    setUpdatedService({
      name: '',
      description: '',
      price: 0
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://capstone-be-den4.onrender.com/api/cleaningservices/${selectedService._id}`, updatedService,{
        headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the request headers
        },
    });
      // Update the services array to reflect changes
      const updatedServices = services.map(service => {
        if (service._id === selectedService._id) {
          return {
            ...service,
            name: updatedService.name,
            description: updatedService.description,
            price: updatedService.price
          };
        }
        return service;
      });
      setServices(updatedServices);
      setShowEditModal(false);
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Service updated successfully'
      });
    } catch (err) {
      console.error('Error updating service:', err);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update service'
      });
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`https://capstone-be-den4.onrender.com/api/cleaningservices/${serviceId}`,{
        headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the request headers
        },
    });
      // Filter out the deleted service from the services array
      const updatedServices = services.filter(service => service._id !== serviceId);
      setServices(updatedServices);
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Service deleted successfully'
      });
    } catch (err) {
      console.error('Error deleting service:', err);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete service'
      });
    }
  };

  return (
    <div className="services-tab-container">
      <h2 className="text-center my-3">Services</h2>
      {loading ? (
        <p><LoadingComponent /></p>
      ) : error ? (
        <p><ErrorPage error={error} /></p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Service Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>{service.price}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(service)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(service._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formServiceName">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter service name" value={updatedService.name} onChange={(e) => setUpdatedService({ ...updatedService, name: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter description" value={updatedService.description} onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="Enter price" value={updatedService.price} onChange={(e) => setUpdatedService({ ...updatedService, price: e.target.value })} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
              <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ServicesTab;
