import React from 'react';

const ErrorComponent = ({ error }) => (
  <div className='error'>Error: {error}</div>
);

const errorStyles = `
  .error {
    background: #ffcccc; /* You can choose any color for error background */
    color: #ff0000; /* You can choose any color for error text */
    padding: 20px;
    border: 2px solid #ff0000; /* You can choose any color for error border */
    border-radius: 5px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 80%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease-in-out; /* Animation */
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .error {
      max-width: 90%;
    }
  }
`;

const ErrorPage = () => (
  <>
    <style>{errorStyles}</style>
    <ErrorComponent error="Something went wrong! Please Login  !!!!!" />
  </>
);

export default ErrorPage;
