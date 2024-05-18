import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const Contact = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    cleaningType: '',
    inContract: '',
    identity: [],
    help: '',
    blog: false
  };

  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!values.email) {
      errors.email = 'Email Address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    axios.post('https://capstone-be-den4.onrender.com/api/userdata/userdata', values)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        resetForm();
        setStatus({ success: true });
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setStatus({ success: false });
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-5" style={{ backgroundImage: `url(https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1715597294~exp=1715600894~hmac=d19587c2a68906da2c84f39be30fe5fe21cec0adc37814b8f0c6c8afc7562952&w=900)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-center animate__animated animate__slideInDown" style={{ color: 'darkgreen' }}>CONTACT</h1>
      <p className="text-center animate__animated animate__fadeIn" style={{ color: 'blue' }}>Cleanease has been dedicated to delivering top-notch cleaning services for over 16 years. Our team takes pride in providing meticulous cleaning solutions for both residential and commercial properties. We frequently meet clients in person and are passionate about sharing our expertise at educational events on maintaining clean and healthy environments.</p>

      <div className="row mt-5 animate__animated animate__fadeIn">
        <div className="col-md-6">
          <h3 style={{ color: 'red' }}>Contact Information</h3>
          <p ><strong>Email:</strong> cleanease@gmail.com</p>
          <p><strong>Phone:</strong> 1-800-227-1031</p>
          <p><strong>Orlando Office:</strong><br />1816 Bimini Drive,<br />Orlando, FL 32806</p>
          <p><strong>Naples Office:</strong><br />1725 Marsh Run,<br />Naples, FL 34109</p>
        </div>
        <div className="col-md-6">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validate}
          >
            {formik => (
              <>
                {formik.status && formik.status.success ? (
                  <div className="alert alert-success">Your form has been successfully submitted!</div>
                ) : (
                  <Form className="contact-form-box">
                    <h3 style={{ color: 'red' }}>Contact Form</h3>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label" style={{ color: 'blue' }}>First Name *</label>
                      <Field type="text" className="form-control" id="firstName" name="firstName" />
                      <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label" style={{ color: 'blue' }}>Last Name *</label>
                      <Field type="text" className="form-control" id="lastName" name="lastName" />
                      <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label" style={{ color: 'blue' }}>Email Address *</label>
                      <Field type="email" className="form-control" id="email" name="email" />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label" style={{ color: 'blue' }}>Phone Number</label>
                      <Field type="text" className="form-control" id="phoneNumber" name="phoneNumber" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cleaningType" className="form-label" style={{ color: 'blue' }}>Cleaning Type</label>
                      <Field as="select" className="form-select" id="cleaningType" name="cleaningType">
                        <option value="">Select cleaning type</option>
                        <option value="standard cleaning">Standard Cleaning</option>
                        <option value="deep cleaning">Deep Cleaning</option>
                        <option value="window cleaning">Window Cleaning</option>
                        <option value="kitchen cleaning">Kitchen Cleaning</option>
                        <option value="bathroom cleaning">Bathroom Cleaning</option>
                      </Field>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inContract" className="form-label" style={{ color: 'blue' }}>In Contract Availability</label>
                      <Field as="select" className="form-select" id="inContract" name="inContract">
                        <option value="">Select availability</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                      </Field>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{ color: 'blue' }}>Identity</label>
                      <div className="form-check">
                        <Field className="form-check-input" type="checkbox" id="male" name="identity" value="male" />
                        <label className="form-check-label" htmlFor="male">Male</label>
                      </div>
                      <div className="form-check">
                        <Field className="form-check-input" type="checkbox" id="female" name="identity" value="female" />
                        <label className="form-check-label" htmlFor="female">Female</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="help" className="form-label" style={{ color: 'blue' }}>How may we help you?</label>
                      <Field as="textarea" className="form-control" id="help" name="help" />
                    </div>
                    <div className="mb-3 form-check">
                      <Field type="checkbox" className="form-check-input" id="blog" name="blog" />
                      <label className="form-check-label" htmlFor="blog" style={{ color: 'orange' }}>Sign Up for Blog?</label>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
                  </Form>
                )}
              </>
            )}
          </Formik>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <p className="text-center animate__animated animate__fadeIn">"Experience matters in cleanliness. At Cleanease, we prioritize responsiveness and value your questions, ensuring tailored solutions for pristine spaces."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
