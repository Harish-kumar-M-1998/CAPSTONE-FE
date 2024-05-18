import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Toast } from 'react-bootstrap';
import StarRating from './StarRating'; // Import the StarRating component

const RatingAndReview = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [improvements, setImprovements] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [reviews, setReviews] = useState([]);

    const user = JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
        // Check if user is logged in
       
        if (user) {
            setCurrentUser(user);
            setName(user.username);
            setEmail(user.email);
        }

        // Fetch reviews from the backend when the component mounts
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('https://capstone-be-den4.onrender.com/api/rating/all', {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Include the token in the request headers
                },
            });
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the data to be submitted
        const requestData = {
            name,
            email,
            service: selectedService,
            starRating: rating,
            review,
            improvements,
        };

        // Submit the form data to the backend API endpoint using Axios
        axios.post('https://capstone-be-den4.onrender.com/api/rating/rating', requestData, {
            headers: {
                Authorization: `Bearer ${user.token}`, // Include the token in the request headers
            },
        })
            .then(response => {
                console.log(response.data); // Log the response data for debugging
                if (response.status === 201) {
                    // Reset form fields
                    setName('');
                    setEmail('');
                    setSelectedService('');
                    setRating(0);
                    setReview('');
                    setImprovements('');

                    // Show success toast
                    setShowToast(true);

                    // Fetch reviews again to update the displayed reviews
                    fetchReviews();
                } else {
                    console.error('Unexpected status code:', response.status);
                }
            })
            .catch(error => {
                console.error('Error submitting rating and review:', error);
            });
    };

    return (
        <Container>
            <h2 className="mt-4 text-primary">Rating & Review</h2>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="nameInput">
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="serviceSelect" className="mb-3">
                            <Form.Select value={selectedService} onChange={handleServiceChange}>
                                <option value="">Choose Service...</option>
                                <option value="Standard Cleaning">Standard Cleaning</option>
                                <option value="Window Cleaning">Window Cleaning </option>
                                <option value="service3">Kitchen Cleaning </option>
                                <option value="Kitchen Cleaning">Office Cleaning</option>
                                <option value="Move In Cleaning">Move In Cleaning</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="ratingSelect" className="mb-3">
                            <StarRating rating={rating} onRatingChange={handleRatingChange} />
                        </Form.Group>
                        <Form.Group controlId="reviewTextarea" className="mb-3">
                            <Form.Control as="textarea" rows={3} value={review} onChange={(e) => setReview(e.target.value)} placeholder="Your Review" />
                        </Form.Group>
                        <Form.Group controlId="improvementsTextarea" className="mb-3">
                            <Form.Control as="textarea" rows={3} value={improvements} onChange={(e) => setImprovements(e.target.value)} placeholder="Improvements" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                            Submit
                        </Button>
                    </Form>
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            right: 20,
                            backgroundColor: '#0d6efd',
                            color: '#fff',
                            zIndex: 9999,
                        }}
                    >
                        <Toast.Header>
                            <strong className="me-auto">Submission Status</strong>
                        </Toast.Header>
                        <Toast.Body>Your review has been submitted successfully!</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <h2 className="mt-5 mb-4 text-primary">People Review About Us</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center">
                {reviews.map((review, index) => (
                    <Col key={index} className="mb-4">
                        <Card style={{
                            background: 'linear-gradient(to bottom right, #b3e0ff, #b3ffb3)',
                            padding: '1rem',
                            borderRadius: '10px',
                            height: '100%'
                        }}>
                            <Card.Body className='text-center'>
                                <Card.Title style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '2rem',
                                    color: '#333'
                                }}>{review.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{review.email}</Card.Subtitle>
                                <Card.Text style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '1.5rem',
                                    color: 'red'
                                }}> {review.service}</Card.Text>
                                <Card.Text style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '1rem',
                                    color: 'purple'
                                }}>Review: {review.review}</Card.Text>
                                {review.improvements && <Card.Text style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '1rem',
                                    color: 'green'
                                }}>Improvements: {review.improvements}</Card.Text>}
                                <StarRating rating={review.starRating} color="#ff0000" />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RatingAndReview;
