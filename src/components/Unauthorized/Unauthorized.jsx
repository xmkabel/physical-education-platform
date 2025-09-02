import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav/Nav';
import './Unauthorized.css';

const Unauthorized = ({title , code}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/exams');
  };

  return (
    <div className="unauthorized-container">
      <Nav title={title} />
      <Container className="mt-5">
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <div className="error-content">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="error-icon mb-4"
              />
              <h1 className="error-title">{code}</h1>
              <h2 className="error-subtitle mb-4">{title}</h2>
              {/* <p className="error-message mb-4">
                عذراً، لا يمكنك الوصول إلى هذه الصفحة. يرجى العودة إلى صفحة الاختبارات.
              </p> */}
              <Button 
                variant="primary" 
                className="backk-button"
                onClick={handleBack}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="ms-2" />
                العودة إلى الاختبارات 
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Unauthorized;
