import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, ProgressBar, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faChartLine, 
  faTrophy, 
  faCalendar,
  faArrowLeft,
  faArrowRight,
  faClock,
  faPercent,
  faListAlt,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import get from '../api/get';
import { object } from 'framer-motion/client';
import ChaptersProgress from './ChapterProgress';





const renderTestCard = (idx, test, isPassing, percentage) => {
  return (
    <div key={idx} className="test-result-card" style={{
      padding: '10px',
      border: test.score ? `1px solid ${isPassing ? '#28a745' : '#dc3545'}` : '1px solid #dee2e6',
      borderRadius: '8px',
      marginBottom: '8px',
      backgroundColor: test.score ? (isPassing ? '#f8fff9' : '#fff9f9') : '#f8f9fa'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5px'
      }}>
        <span style={{fontWeight: 600}}>اختبار {idx + 1}</span>
        {test.score && (
          <span style={{
            backgroundColor: isPassing ? '#28a745' : '#dc3545',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>
            {isPassing ? 'ناجح' : 'لم يجتاز'}
          </span>
        )}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontWeight: 600,
          fontSize: '1.1em',
          color: test.score ? '#1b3058' : '#6c757d'
        }}>
          {test.score ? `${test.score} / ${test.fullScore}` : 'لم يتم الاختبار بعد'}
        </span>
        {percentage && (
          <span style={{
            fontWeight: 500,
            color: isPassing ? '#28a745' : '#dc3545'
          }}>
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

function Dashboard({ 
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
  const navigate = useNavigate();

  const [examsCount,setCompletedExams]=useState(0);
  const [preExam,setPreExam]=useState({});
  const [postExam,setPostExam]=useState({});
  const [profileData,setProfileDate]=useState({});

  const fetchProfileData = async ()=>{
    let profile_data= await get('/me ');
  return profile_data}

  const fetchExamsCount=async ()=>{
    let examsCount= await get('/exams-count');
   
    return examsCount.finished_exams
  }
  const fetchPreExam=async ()=>{
    let pre_exam= await get('/user-rating-exams');
    
    return pre_exam.rating_exams[0]?pre_exam.rating_exams[0] :{}
  }

  const fetchPostExam=async ()=>{
    let post_exam= await get('/user-rating-exams');
   
    return post_exam.rating_exams[1]?post_exam.rating_exams[1] :{}
  }

  useEffect(() => {
    const fetchData = async () => {
      const examsCount = await fetchExamsCount();
      setCompletedExams(examsCount);

      const preExamData = await fetchPreExam();
      setPreExam(preExamData);

      const profileData = await fetchProfileData();
      setProfileDate(profileData);

      const postExamData = await fetchPostExam();
      setPostExam(postExamData);

      console.log("after setting state:", examsCount);
    };

    fetchData();
  }, []);

  // Calculate improvement percentage
  const improvement = studentData.postTest.score - studentData.preTest.score;
  const improvementPercentage = ((improvement) / studentData.preTest.score * 100).toFixed(1);
  const hasImprovement = improvement > 0;

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader position-relative">
        <button 
          className="logoutButton position-absolute" 
          // style={{ left: '2rem', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          تسجيل الخروج <FontAwesomeIcon icon={faSignOut} className="mx-2 fa-flip-horizontal" />
        </button>
        <h1 className="dashboardTitle">
          لوحة تتبع التقدم الأكاديمي
        </h1>
        <button 
          className="backButton" 
          onClick={() => navigate(-1)} // 🔙 Go Back
        >
          <FontAwesomeIcon icon={faArrowRight} className="backArrow" /> العودة
        </button>
      </div>

      <Container className="py-4">
        {/* Student Info Card */}
        <Card className="cardD mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            معلومات الطالب
          </Card.Header>
          <Card.Body>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <div className="student-info-row">
                  <span className="student-info-label">
                    الاسم: {profileData.first_name+" "+profileData.last_name || "NA"}
                  </span>
                  <span className="student-info-divider"></span>
                  <span className="student-info-label">
                    الكود: {profileData.code || "000"}
                  </span>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Pre/Post Test Comparison Card */}
        <Card className="cardD mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faTrophy} className="mx-2" />
            مقارنة الاختبار القبلي والبعدي
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={5}>
                <div className="testScoreCard pre-test">
                  <h5>الاختبار القبلي</h5>
                  <div className="score-circle">
                    <h3>{preExam.score?preExam.score:'__' }%</h3>
                  </div>
                  <p className="text-muted">
                    {preExam.score ? new Date(preExam.created_at).toLocaleDateString('en-Eg') : 'لم يتم الاختبار بعد'}
                  </p>
                </div>
              </Col>
              
              <Col md={2} className="d-flex align-items-center justify-content-center">
                <div className="improvement-indicator">
                  <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    className={`improvement-arrow ${(preExam.score && postExam.score) ? (postExam.score - preExam.score > 0 ? 'text-success' : 'text-danger') : ''}`}
                  />
                  <div className={`improvement-value ${(preExam.score && postExam.score) ? (postExam.score - preExam.score > 0 ? 'text-success' : 'text-danger') : ''}`}>
                    {(preExam.score && postExam.score) ? `${((postExam.score - preExam.score) / preExam.score * 100).toFixed(1)}%` : '--'}
                  </div>
                </div>
              </Col>

              <Col md={5}>
                <div className="testScoreCard post-test">
                  <h5>الاختبار البعدي</h5>
                  <div className="score-circle">
                    <h3>{postExam.score?postExam.score:'__' }</h3>
                  </div>
                  <p className="text-muted">
                    {postExam.score ? new Date(postExam.created_at).toLocaleDateString('en-Eg') : 'لم يتم الاختبار بعد'}
                  </p>
                </div>
              </Col>
            </Row>
            <div className="text-center mt-4">
              {(preExam.score && postExam.score) ? (
                <p className="improvement-summary text-success">
                  نسبة تحسن الأداء: {((postExam.score - preExam.score) / preExam.score * 100).toFixed(1)}%
                </p>
              ) : (
                <p className="improvement-summary text-danger">
                  يجب عليك الانتهاء من الاختبارات لحساب نسبة تحسن الاداء
                </p>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* Overall Progress Card */}
        <Card className="cardD mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faChartLine} className="mx-2" />
            التقدم الإجمالي
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>تقدم الدورة التدريبية</span>
                <span className="fw-bold">{Math.round(examsCount/studentData.remainingQuizzes*100)}%</span>
              </div>
              <ProgressBar 
                now={examsCount/studentData.remainingQuizzes*100} 
                className="progressBar"
              />
            </div>
            <Row className="text-center">
              <Col>
                <Badge className="badge completed-quizzes">
                  {examsCount} اختبار مكتمل
                </Badge>
              </Col>
              <Col>
                <Badge className="badge remaining-quizzes">
                  {studentData.remainingQuizzes - examsCount} اختبار متبقي
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>

               <ChaptersProgress profileData={profileData} />

  


        {/* Recent Quiz Results */}
        {/* <Card className="cardD mb-4">
          <Card.Header className="cardHeader">
            <FontAwesomeIcon icon={faCalendar} className="mx-2" />
            نتائج الاختبارات الأخيرة
          </Card.Header>
          <Card.Body>
            <div className="text-center py-4">
              <FontAwesomeIcon icon={faClock} size="3x" className="text-muted mb-3" />
              <p className="text-muted">لم تكمل أي اختبارات بعد</p>
              <Button className="button" onClick={() => navigate("/exams")}>
                ابدأ الاختبارات
              </Button>
            </div>
          </Card.Body>
        </Card> */}

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <Button className="button" onClick={() => navigate("/exams")}>
            <FontAwesomeIcon icon={faListAlt} className="mx-2" />
            عرض جميع الاختبارات
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
