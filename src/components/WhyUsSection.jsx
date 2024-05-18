import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for card hover effect
const cardHoverAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Styled components for card
const Card = styled.div`
  flex: 1;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    animation: ${cardHoverAnimation} 0.3s ease infinite;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 767px) {
    margin: 10px 0;
  }
`;

// Styled components for card image
const CardImage = styled.div`
  img {
    width: 90%;
    height: auto;
    max-height: 150px;
    border-radius: 10px 10px 0 0;
  }
`;

// Styled components for card body
const CardBody = styled.div`
  padding: 20px;

  h4 {
    color: #333;
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const WhyUsWrapper = styled.div`
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 24px; /* Adjust font size as needed */
  line-height: 1.5; /* Adjust line height as needed */

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

const WhyUsSection = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <WhyUsWrapper>
            <div className="above-heading" style={{ color: '#48C9B0' }}>WHY US</div>
            <Heading className="h2-heading" style={{ color: '#B03A2E ' }}>Our professional and efficient team provides impeccable service, making life a little easier.</Heading>
          </WhyUsWrapper>
        </div>
      </div>
      <div className="row">
        {/* Card 1 */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <Card>
            <CardImage className="card-image">
              <img className="img-fluid my-1" src="https://cleanease.ca/images/group.svg" alt="alternative" />
            </CardImage>
            <CardBody className="card-body">
              <h4 className="card-title" style={{ color: '#76448A  ' }}>Our Trusted Team</h4>
              <p style={{ color: '#17A589 ' }}>From deep cleaning to decluttering, we are proven to reduce stress and improve happiness.</p>
            </CardBody>
          </Card>
        </div>
        {/* Card 2 */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <Card>
            <CardImage className="card-image">
              <img className="img-fluid my-1" src="https://cleanease.ca/images/relax.svg" alt="alternative" />
            </CardImage>
            <CardBody className="card-body">
              <h4 className="card-title" style={{ color: '#76448A  ' }}>Clear your space, Clear your mind</h4>
              <p style={{ color: '#17A589  ' }}>Let us make life a little easier for you with our professional expertise.</p>
            </CardBody>
          </Card>
        </div>
        {/* Card 3 */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <Card>
            <CardImage className="card-image">
              <img className="img-fluid my-1" src="https://cleanease.ca/images/spray.svg" alt="alternative" />
            </CardImage>
            <CardBody className="card-body">
              <h4 className="card-title" style={{ color: '#76448A  ' }}>CleanEase Satisfaction Guarantee</h4>
              <p style={{ color: '#17A589 ' }}>Going above and beyond to achieve your complete satisfaction.</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;