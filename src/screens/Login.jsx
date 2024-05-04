import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = ({ email, password }) => {
    axios.post('http://localhost:3000/api/users/login', { email, password })
      .then(response => {
        console.log(response.data); // Log the response data for debugging
        if (response.status === 200 ) {
          // Store user information in local storage
          localStorage.setItem('currentUser', JSON.stringify(response.data));
  
          // Navigate to home page
          navigate('/home');
          window.location.reload();

          // Show success message
          toast.success('Login successful');
        } else if (response.status === 400) {
          toast.error('Invalid email or password');
        } else {
          console.error('Unexpected status code:', response.status);
          toast.error('Unexpected server response');
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        toast.error('You are not registerd');
        setTimeout(() => {
          navigate('/register');
        }, 4000);
      });
  };
  
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <ToastContainer />
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-4 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {formik => (
                        <Form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="email" id="email" name="email" className="form-control" />
                              <label className="form-label" htmlFor="email">Your Email</label>
                              <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="password" id="password" name="password" className="form-control" />
                              <label className="form-label" htmlFor="password">Password</label>
                              <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                          </div>
                          <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" htmlFor="form2Example3c">
                              Remember me
                            </label>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Sign in</button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
