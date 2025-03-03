import React from 'react';
import { Container, Row, Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/icon.png';
import student from '../../assets/student.png';
import board from '../../assets/board.png';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './home.css';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import VideoCard from '../VideoCard';
import videos from '../../videos';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar className='nav-navy-blue' expand="lg" >
                <Container>
                    <Navbar.Brand href="#home">التربية البدنية <img src={logo} alt="logo" width={'30px'} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">الرئيسية</Nav.Link>
                          
                            <Nav.Link href="#courses">الدورات</Nav.Link>
                            <Link className='nav-link'  to={'/'}>من نحن</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Carousel
                data-bs-theme="dark"
                prevIcon={<FontAwesomeIcon icon={faCircleArrowRight} className='arrow-navy-blue' />}
                nextIcon={<FontAwesomeIcon icon={faCircleArrowLeft} className='arrow-navy-blue' />}>
                <Carousel.Item>
                    <div className='w-100 d-flex justify-content-center'>
                        <img src={board} alt="interactive board" className='slider-image' />
                    </div>
                    <Carousel.Caption>
                        <h3>دروس تفاعلية متميزة</h3>
                        <p>تعلم التربية البدنية بأسلوب عصري وتفاعلي</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='w-100 d-flex justify-content-center'>
                        <img src={student} alt="student learning" className='slider-image' />
                    </div>
                    <Carousel.Caption>
                        <h3>تدريبات وتمارين متنوعة</h3>
                        <p>قيم مستواك من خلال اختبارات تفاعلية متنوعة</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='w-100 d-flex justify-content-center'>
                        <img src={logo} alt="logo" className='slider-image' />
                    </div>
                    <Carousel.Caption>
                        <h3>اختبارات تفاعلية</h3>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>



            <Container id='courses' className='videos'>
                <h2>مقاطع تعليمية</h2>
                <Row>
                    {
                        videos.map((video) => {
                            return (
                                <div className="col-4" key={video.id}>
                                    <VideoCard id={video.id} title={video.title} src={video.src} />
                                </div>
                            );
                        })
                    }
                </Row>
            </Container>


        </div>
    );
};

export default Home;
