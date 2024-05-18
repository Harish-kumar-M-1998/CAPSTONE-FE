import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './head.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const runningAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const HeaderContentWrapper = styled.div`
  .header-content {
    background-color: #f8f9fa;
    padding: 50px 0;
  }

  .text-container {
    padding: 20px;
    animation: ${runningAnimation} 2s infinite; /* Apply animation to text-container */
  }

  .main-header-title {
    color: blue;
    font-size: 2em;
    animation: ${runningAnimation} 2s infinite; /* Apply animation to main-header-title */
  }

  .image-container {
    /* No animation applied to image-container */
  }

  .img-fluid-0 {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .btn-outline-sm1 {
    padding: 20px 40px;
    border: 2px solid transparent;
    border-radius: 10px; /* Adjust border radius as needed */
    transition: all 0.3s ease;
    background-color: transparent;
    color: blue;
    cursor: pointer;

    &:hover {
      border-color: blue;
      background-color: #f8f9fa;
    }
  }

  .custom-input {
    margin-bottom: 15px;
  }

  .custom-select {
    margin-bottom: 15px;
  }
`;

const ContactInfoWrapper = styled.div`
  text-align: center;
`;

const HeaderContent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    availability: '',
    date: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission here
    
    // Example: Submitting the form data to an API endpoint using axios
    axios.post('https://capstone-be-den4.onrender.com/api/quote/quote', formData,{
      headers: {
          Authorization: `Bearer ${user.token}`, // Include the token in the request headers
      },
  })
      .then(response => {
        console.log(response.data); // Log the response data for debugging
        if (response.status === 201) {
          // Close modal
          setModalIsOpen(false);
  
          // Show success message
          toast.success('Quote request submitted successfully');
        } else {
          console.error('Unexpected status code:', response.status);
          toast.error('Failed to submit quote request');
        }
      })
      .catch(error => {
        console.error('Error submitting quote request:', error);
        toast.error('Failed to submit quote request');
      });
  };

  return (
    <HeaderContentWrapper>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-5">
            <div className="image-container">
              <div className="">
                <img className="img-fluid-0 my-3" src="https://t4.ftcdn.net/jpg/05/78/61/03/360_F_578610304_3AxU7UsNrKyxj0IlgukFpLgX3I9EftX4.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-7">
            <div className="text-container">
              <h1 className="main-header-base" style={{color :'#1A5276'}}>Cleaning and Organizing</h1>
              <h1 className="main-header-title">For You</h1>
              <br />
              <p className="p-large">You deserve to surround yourself with clarity and cleanliness. Where there is order, there is Tranquility.</p>
              <button className="btn-outline-sm1 popup-with-move-anim" onClick={() => setModalIsOpen(true)}>GET QUOTE</button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Get  Quote</Modal.Title>
          <ContactInfoWrapper>
            <p>You can reach us at <strong>416-428-9409</strong> or <strong>contact@cleanease.ca</strong></p>
          </ContactInfoWrapper>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group custom-input">
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Name" required />
            </div>
            <div className="form-group custom-input">
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
            </div>
            <div className="form-group custom-input">
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Phone" required />
            </div>
            <div className="form-group custom-select">
              <select name="service" value={formData.service} onChange={handleChange} className="form-control" required>
                <option value="">Select Service</option>
                <option value="standard cleaning">Standard Cleaning</option>
                <option value="window cleaning">Window Cleaning</option>
                <option value="office cleaning">Office Cleaning</option>
                <option value="kitchen cleaning">Kitchen Cleaning</option>
                <option value="move in cleaning">Move In Cleaning</option>
              </select>
            </div>
            <div className="form-group custom-select">
              <select name="availability" value={formData.availability} onChange={handleChange} className="form-control" required>
                <option value="">Availability</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
            <div className="form-group custom-input">
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
            </div>
            <Button variant="primary" className="button" type="submit">Get Quote</Button>
            <Button variant="secondary" className="button" onClick={() => setModalIsOpen(false)}>Back</Button>
          </form>
        </Modal.Body>
      </Modal>
    </HeaderContentWrapper>
  );
};

export default HeaderContent;
