import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LandingPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeInAnimation} 2s ease;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper style={{ backgroundImage: `url(https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1715597294~exp=1715600894~hmac=d19587c2a68906da2c84f39be30fe5fe21cec0adc37814b8f0c6c8afc7562952&w=900)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container>
        <Row>
          <Col lg={6}>
            <img
              src="https://cdn.dribbble.com/users/6498639/screenshots/15141150/media/b306a0b1906db326d48d3f6921698a65.gif"
              alt="CleanEase"
              style={{
                borderRadius: '10px', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
                backgroundColor: '#AED6F1 ', 
                maxWidth: '100%', 
              }}
            />

          </Col>
          <Col lg={6}>
            <ContentWrapper style={{ color: "#2471A3", backgroundColor: '#E5E7E9' }}>
              <h1 className="display-4">CleanEase</h1>
              <h2>Your Cleanliness Partner</h2>
              <Link to="/register">
                <Button variant="primary" size="lg" style={{ color: "#F4D03F" }}>Get Started</Button>
              </Link>
            </ContentWrapper>
          </Col>
        </Row>
      </Container>
    </LandingPageWrapper>
  );
};

export default LandingPage;
