import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-dark py-5 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h3>About CleanEase</h3>
            <p>CleanEase creates Healthier and Functional Home and Business Spaces with Trust and Integrity.</p>
          </div>
          <div className="col-md-6">
            <h3>Contact</h3>
            <p>Phone: 416-428-9409</p>
            <p>Email: <a href="mailto:contact@cleanease.ca" className="text-dark">contact@cleanease.ca</a></p>
            <p>Website: <a href="https://www.cleanease.ca" className="text-dark">www.cleanease.ca</a></p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <p>&copy; {currentYear} CleanEase. All rights reserved.</p>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><a href="#" className="text-dark">Terms of Use</a></li>
              <li className="list-inline-item mx-2">|</li>
              <li className="list-inline-item"><a href="#" className="text-dark">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
