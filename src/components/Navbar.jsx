import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    // Clear user information from local storage upon logout
    localStorage.removeItem('currentUser');
    setCurrentUser(null);

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="/">
            <img
              src="https://cleanease.ca/images/default.svg"
              height="35"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/home">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/rating-and-review">Rating & Review</a>
            </li>
            
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {currentUser ? (
            <>
              {currentUser.isAdmin && (
                <a href="/admin" className="btn btn-primary me-2 mx-2">Admin</a>
              )}
              <div className="dropdown">
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    textDecoration: 'none', // Remove underline
                    color: 'black', // Text color
                    fontWeight: 'bold', // Bold text
                    fontSize: '16px', // Font size
                    padding: '8px 12px', // Padding
                    borderRadius: '10%', // Rounded corners
                    backgroundColor: 'beige', // Background color
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Box shadow
                    transition: 'background-color 0.3s', // Smooth transition
                  }}
                >
                  <span className="me-2">{currentUser.username}</span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                  <li><a className="dropdown-item" href="/profile">My profile</a></li>
                  
                  <li><a className="dropdown-item" href="/login" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <a href="/login" className="btn btn-primary me-2 mx-2">Login</a>
              <a href="/register" className="btn btn-secondary">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
