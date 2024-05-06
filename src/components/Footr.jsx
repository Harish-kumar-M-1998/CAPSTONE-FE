import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About CleanEase</h3>
            <p>CleanEase creates Healthier and Functional Home and Business Spaces with Trust and Integrity.</p>
          </div>
          <div className="col-md-6">
            <h3>Contact</h3>
            <p>Phone: 416-428-9409</p>
            <p>Email: <a href="mailto:contact@cleanease.ca" className="text-light">contact@cleanease.ca</a></p>
            <p>Website: <a href="https://www.cleanease.ca" className="text-light">www.cleanease.ca</a></p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <p>&copy; {currentYear} CleanEase. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
