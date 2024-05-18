import React from 'react';


const CleaningServicesAbout = () => {
  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container" style={{ backgroundImage: `url(https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1715597294~exp=1715600894~hmac=d19587c2a68906da2c84f39be30fe5fe21cec0adc37814b8f0c6c8afc7562952&w=900)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
          <div className="col-12 col-lg-6 col-xl-5 animate__animated animate__fadeInLeft">
            <img className="img-fluid rounded mx-3" loading="lazy" src="https://t4.ftcdn.net/jpg/05/78/61/03/360_F_578610304_3AxU7UsNrKyxj0IlgukFpLgX3I9EftX4.jpg" alt="Cleaning Services" />
          </div>
          <div className="col-12 col-lg-6 col-xl-7 animate__animated animate__fadeInRight">
            <div className="row justify-content-xl-center">
              <div className="col-12 col-xl-11">
                <h2 className="h1 mb-3 animate__animated animate__fadeInUp my-2">Who Are We?</h2>
                <p className="lead fs-4 text-secondary mb-3 animate__animated animate__fadeInUp">Welcome to CleanEase, your premier provider of professional cleaning services.</p>
                <p className="mb-5 animate__animated animate__fadeInUp">At CleanEase, we are committed to delivering exceptional cleaning solutions for both residential and commercial properties. Our team of experienced professionals is dedicated to ensuring pristine and hygienic environments for our clients.</p>
                <div className="row gy-4 gy-md-0 gx-xxl-5X animate__animated animate__fadeInUp">
                  <div className="col-12 col-md-6">
                    <div className="d-flex shadow p-3 mb-5 bg-body rounded">
                      <div className="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="mb-3">Comprehensive Solutions</h4>
                        <p className="text-secondary mb-0">We offer a wide range of cleaning services tailored to meet the unique needs of our clients.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="d-flex shadow p-3 mb-5 bg-body rounded">
                      <div className="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="mb-3">Expert Team</h4>
                        <p className="text-secondary mb-0">Our team consists of skilled professionals committed to delivering outstanding results with every cleaning service.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningServicesAbout;
