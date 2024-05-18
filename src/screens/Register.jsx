import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Repeat Password is required'),
  });

  const handleSubmit = async ({ username, email, password, repeatPassword }) => {
    try {
      const response = await axios.post('https://capstone-be-den4.onrender.com/api/users/register', {
        username,
        email,
        password,
        repeatPassword
      });

      if (response.status === 201) {
        navigate('/login');
        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error('Unexpected status code:', response.status);
        Swal.fire({
          icon: 'error',
          title: 'Unexpected server response',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      console.error('Registration failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <section className="vh-100" style={{ backgroundImage: `url(https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1715597294~exp=1715600894~hmac=d19587c2a68906da2c84f39be30fe5fe21cec0adc37814b8f0c6c8afc7562952&w=900)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                          <div className="mb-4">
                            <Field type="text" id="username" name="username" className="form-control" placeholder="Your Name" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                          </div>
                          <div className="mb-4">
                            <Field type="email" id="email" name="email" className="form-control" placeholder="Your Email" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </div>
                          <div className="mb-4">
                            <Field type="password" id="password" name="password" className="form-control" placeholder="Password" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </div>
                          <div className="mb-4">
                            <Field type="password" id="repeatPassword" name="repeatPassword" className="form-control" placeholder="Repeat your password" />
                            <ErrorMessage name="repeatPassword" component="div" className="text-danger" />
                          </div>
                          <div className="form-check mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" htmlFor="form2Example3c">
                              I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                          </div>
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg">Register</button>
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
