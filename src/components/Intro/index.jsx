import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { faGraduationCap, faBook,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.webp';
import './index.css';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <>
      

      <Container className="py-4">
        <div className="text-center mb-5 animate__animated animate__fadeIn">
          {/* <h1 className="display-5 u-title mb-3">جامعة حلوان</h1> */}
          <img src={logo} alt="Logo" width={'200px'}/>
          <p className="lead text-muted"> <br/>
          <strong>أهداف البرنامج:</strong>
          <br/>
          تنمية التحصيل المعرفي لطالبات الفرقة الرابعة – شعبة تعليم  لمقرر طرق التدريس .
          <br/>
          استخدام بيئة تعلم الكترونية تفاعلية وتوظيفها لتنمية التحصيل المعرفي المرتبط بمقرر طرق التدريس.
          <br/>
          <br/>
          <h4 className="gold">هذا البرنامج مخصص للحصول على درجة الدكتوراه في طرق التدريس</h4>
          </p>
        </div>

        <Card className="shadow-lg border-0 mb-5 animate__animated animate__fadeInUp">
          <Card.Body className="p-5">
            <p className="text-center mb-4 description">
              <FontAwesomeIcon icon={faBook} className="me-3 ms-1 gold" />
                 فاعلية بيئة تعلم إلكترونية تفاعلية على التحصيل المعرفي  
وتنمية مهارات تدريس التربية الرياضية
<br/>
The effectiveness of an interactive electronic learning environment on cognitive achievement and developing physical education teaching skills
            </p>

            <div className="text-center mt-5">
              <h3 className="text-muted mb-4">تحت إشراف.</h3>
              
              <div className="row justify-content-center">
                <div className="col-md-6 mb-4 animate__animated animate__fadeInLeft">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <FontAwesomeIcon icon={faGraduationCap} className="gold mb-3" size="2x" />
                      <h4>أ.د/ بلانش سلامه متياس</h4>
                      <p className="text-muted">
                        أستاذ طرق تدريس المتفرغ بقسم المناهج وطرق تدريس التربية الرياضية
                        <br />
                        كلية علوم الرياضة بنات - جامعة حلوان
                        <br />
                        (مشرفاً)
                      </p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6 mb-4 animate__animated animate__fadeInRight">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <FontAwesomeIcon icon={faGraduationCap} className="gold mb-3" size="2x" />
                      <h4> أ.د/ وائل رمضان عبد الحميد</h4>
                      <p className="text-muted">
                        أستاذ تكنولوجيا التعليم و وكيل كلية التربية لشئون التعليم والطلاب
                        <br />
                        كلية تربية - جامعة حلوان
                        <br />
                        (مشرفاً)
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
            <Link className='btn btn-navy-blue' to={'/exams'}>الإستمرار <FontAwesomeIcon icon={faArrowLeft} /></Link>
            </div>
           
          </Card.Body>
        </Card>

        <footer className="text-center text-muted mt-5 py-3 animate__animated animate__fadeIn">
          <small>© Copy Rights Reserved to Helwan Univiersity's Student :- Marwa </small>
        </footer>
      </Container>
    </>
  );
}

export default Intro;