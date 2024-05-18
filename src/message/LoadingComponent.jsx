import React from 'react';

const Loading = () => (
  <div className='loading'>
    <div className='spinner'></div>
  </div>
);

const loadingStyles = `
  .loading {
    background-color: #f2f2f2; /* Light grey background */
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    height: 80px;
    width: 80px;
    border: 6px solid;
    border-color: #333 transparent #333 transparent; /* Dark grey spinner */
    border-radius: 50%;
    animation: spin 1.3s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingComponent = () => (
  <>
    <style>{loadingStyles}</style>
    <Loading />
  </>
);

export default LoadingComponent;
