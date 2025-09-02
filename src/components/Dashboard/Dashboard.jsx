import React from 'react';
import { Container, Card, Row, Col, Button, ProgressBar, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faChartLine, 
  faTrophy, 
  faCalendar,
  faCheck,
  faArrowLeft,
  faClock,
  faPercent,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

function Dashboard({ 
  onBack,
  onStartQuiz,
  onViewAllQuizzes,
  studentData = {
    completedQuizzes: 0,
    averageScore: 10,
    overallProgress: 0,
    remainingQuizzes: 26,
    preTest: {
      score: 10,
      date: null
    },
    postTest: {
      score: 90,
      date: null
    }
  }
}) {
  // Calculate improvement percentage
  const improvement = studentData.postTest.score - studentData.preTest.score;
  const improvementPercentage = ((improvement) / studentData.preTest.score * 100).toFixed(1);
  const hasImprovement = improvement > 0;
  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <h1 className="dashboardTitle">
          لوحة تتبع التقدم الأكاديمي
        </h1>
        <button className="backButton" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} className="backArrow" /> العودة
        </button>
      </div>

      <Container className="py-4">
        {/* Student Info Card */}
        <Card className="card mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            معلومات الطالب
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <div className="statCard">
                  <FontAwesomeIcon icon={faListAlt} className="statIcon" />
                  <div>
                    <h4>{studentData.completedQuizzes}</h4>
                    <p>اختبار مكتمل</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="statCard">
                  <FontAwesomeIcon icon={faPercent} className="statIcon" />
                  <div>
                    <h4>{studentData.averageScore}%</h4>
                    <p>متوسط الدرجات</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="statCard">
                  <FontAwesomeIcon icon={faChartLine} className="statIcon" />
                  <div>
                    <h4>{studentData.overallProgress}%</h4>
                    <p>التقدم الإجمالي</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Pre/Post Test Comparison Card */}
        <Card className="card mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faTrophy} className="me-2" />
            مقارنة الاختبار القبلي والبعدي
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={5}>
                <div className="testScoreCard pre-test">
                  <h5>الاختبار القبلي</h5>
                  <div className="score-circle">
                    <h3>{studentData.preTest.score}%</h3>
                  </div>
                  <p className="text-muted">
                    {studentData.preTest.date ? new Date(studentData.preTest.date).toLocaleDateString('ar-SA') : 'لم يتم الاختبار بعد'}
                  </p>
                </div>
              </Col>
              
              <Col md={2} className="d-flex align-items-center justify-content-center">
                <div className="improvement-indicator">
                  <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    className={`improvement-arrow ${hasImprovement ? 'text-success' : 'text-danger'}`}
                  />
                  <div className={`improvement-value ${hasImprovement ? 'text-success' : 'text-danger'}`}>
                    {hasImprovement ? '+' : ''}{improvementPercentage}%
                  </div>
                </div>
              </Col>

              <Col md={5}>
                <div className="testScoreCard post-test">
                  <h5>الاختبار البعدي</h5>
                  <div className="score-circle">
                    <h3>{studentData.postTest.score}%</h3>
                  </div>
                  <p className="text-muted">
                    {studentData.postTest.date ? new Date(studentData.postTest.date).toLocaleDateString('ar-SA') : 'لم يتم الاختبار بعد'}
                  </p>
                </div>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <p className={`improvement-summary ${hasImprovement ? 'text-success' : 'text-danger'}`}>
                {hasImprovement 
                  ? `تحسن الأداء بنسبة ${improvementPercentage}% من الاختبار القبلي إلى البعدي`
                  : 'لم يتم إكمال الاختبارين بعد'}
              </p>
            </div>
          </Card.Body>
        </Card>

        {/* Overall Progress Card */}
        <Card className="card mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faChartLine} className="me-2" />
            التقدم الإجمالي
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>تقدم الدورة التدريبية</span>
                <span className="fw-bold">0%</span>
              </div>
              <ProgressBar 
                now={studentData.overallProgress} 
                className="progressBar"
              />
            </div>
            <Row className="text-center">
              <Col>
                <Badge bg="success" className="badge">
                  {studentData.completedQuizzes} اختبار مكتمل
                </Badge>
              </Col>
              <Col>
                <Badge bg="warning" className="badge">
                  {studentData.remainingQuizzes} اختبار متبقي
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Chapters Progress */}
        <Card className="card mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faTrophy} className="me-2" />
            تقدم الفصول
          </Card.Header>
          <Card.Body>
            <Row>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Col md={6} lg={4} key={item} className="mb-3">
                  <div className="chapterCard">
                    <h6 className="chapterTitle">الفصل {item}</h6>
                    <div className="mb-2">
                      <ProgressBar 
                        now={0} 
                        className="smallProgressBar"
                        variant="primary"
                      />
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>0/0 مكتمل</span>
                      <span>0%</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* Recent Quiz Results */}
        <Card className="card mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faCalendar} className="me-2" />
            نتائج الاختبارات الأخيرة
          </Card.Header>
          <Card.Body>
            <div className="text-center py-4">
              <FontAwesomeIcon icon={faClock} size="3x" className="text-muted mb-3" />
              <p className="text-muted">لم تكمل أي اختبارات بعد</p>
              <Button className="button" onClick={onStartQuiz}>
                ابدأ الاختبارات
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <Button className="button" onClick={onViewAllQuizzes}>
            <FontAwesomeIcon icon={faListAlt} className="me-2" />
            عرض جميع الاختبارات
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;