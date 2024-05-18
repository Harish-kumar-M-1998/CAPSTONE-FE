import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddServices = () => {
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Regular expression to validate URL format
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    // Check if the provided input is a valid URL
    if (!urlPattern.test(imageUrl)) {
      // Show warning message if the URL is not valid
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please provide a valid image URL',
      });
      return; // Stop the function execution if the URL is not valid
    }
    try {
      const serviceData = {
        name,
        availability,
        price,
        location,
        image: imageUrl,
        description,
      };

      await axios.post('https://capstone-be-den4.onrender.com/api/cleaningservices/addCleaningService', serviceData,{
        headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the request headers
        },
    });

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Service added successfully!',
      });

      // Reset form fields after successful submission
      setName('');
      setAvailability('');
      setPrice('');
      setLocation('');
      setImageUrl('');
      setDescription('');
    } catch (err) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error adding service',
      });
    }
  };

  return (
    <div className="container" style ={{color :'#2471A3 ',backgroundColor :'#D5F5E3 '}}>
      <h2 className="text-center my-3" style ={{color :'#2471A3 '}}>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Availability:</label>
          <input type="text" className="form-control" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL:</label>
          <input type="text" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Service</button>
      </form>
    </div>
  );
};

export default AddServices;
