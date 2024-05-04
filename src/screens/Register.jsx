import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Repeat Password is required'),
  });

  const handleSubmit = ({ username, email, password, repeatPassword }) => {
    axios.post('http://localhost:3000/api/users/register', {
      username,
      email,
      password,
      repeatPassword
    })
    .then(response => {
      if (response.status === 201) {
        navigate('/login');
        toast.success('Registration successful');
      } else {
        console.error('Unexpected status code:', response.status);
        toast.error('Unexpected server response');
      }
    })
    .catch(err => {
      console.error('Registration failed:', err);
      toast.error('Registration failed');
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
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <Formik
                      initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        repeatPassword: '',
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {formik => (
                        <Form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="text" id="username" name="username" className="form-control" />
                              <label className="form-label" htmlFor="username">Your Name</label>
                              <ErrorMessage name="username" component="div" className="text-danger" />
                            </div>
                          </div>
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
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="password" id="repeatPassword" name="repeatPassword" className="form-control" />
                              <label className="form-label" htmlFor="repeatPassword">Repeat your password</label>
                              <ErrorMessage name="repeatPassword" component="div" className="text-danger" />
                            </div>
                          </div>
                          <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" htmlFor="form2Example3c">
                              I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
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

export default Signup;
