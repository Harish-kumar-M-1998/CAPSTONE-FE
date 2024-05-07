import React, { useState } from 'react';
import axios from 'axios';

const AddServices = () => {
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null); // Store the image file
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('availability', availability);
      formData.append('price', price);
      formData.append('location', location);
      formData.append('image', image); // Append the image file
      formData.append('description', description);

      // Send service data to the server to add to the database
      await axios.post('http://localhost:3000/api/cleaningservices/addCleaningService', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for form data
        }
      });
      // Reset form fields after successful submission
      setName('');
      setAvailability('');
      setPrice('');
      setLocation('');
      setImage(null);
      setDescription('');
      setSuccess(true);
    } catch (err) {
      setError('Error adding service');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };

  return (
    <div>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Availability:</label>
          <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        {success && <p>Service added successfully!</p>}
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddServices;
