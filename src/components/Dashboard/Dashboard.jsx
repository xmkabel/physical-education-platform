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
import styles from './Dashboard.css';

/**
 * Dashboard component that displays the user's exam progress and statistics
 * @param {Object} props
 * @param {string} props.userName - The name of the user
 * @param {number} props.overallProgress - The overall progress percentage (0-100)
 * @param {Object} props.examStats - Statistics about exams
 * @param {number} props.examStats.averageScore - Average score across all exams
 * @param {number} props.examStats.totalExams - Total number of exams taken
 * @param {string} props.examStats.totalTimeSpent - Total time spent on exams
 * @param {string} props.lastExamDate - Date of the last exam taken
 * @param {Function} props.onStartExam - Function to handle starting a new exam
 * @param {Function} props.onViewProgress - Function to handle viewing detailed progress
 * @param {Function} props.onBack - Function to handle going back
 */
function Dashboard({ 
  userName,
  overallProgress,
  examStats,
  lastExamDate,
  onStartExam,
  onViewProgress,
  onBack
}) {
  return (
    <div className={styles.dashboard}>
      <Container fluid>
        {/* Back Button */}
        <Button 
          variant="link" 
          className={styles.backButton}
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> العودة
        </Button>

        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <h1 className={styles.welcomeText}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              مرحباً {userName}
            </h1>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          {/* Overall Progress Card */}
          <Col md={6} lg={3}>
            <Card className={styles.statsCard}>
              <Card.Body>
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon icon={faChartLine} className={styles.cardIcon} />
                </div>
                <h3>التقدم الكلي</h3>
                <ProgressBar 
                  now={overallProgress} 
                  label={`${overallProgress}%`} 
                  className="mb-2" 
                />
                <p className={styles.statValue}>{overallProgress}% مكتمل</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Average Score Card */}
          <Col md={6} lg={3}>
            <Card className={styles.statsCard}>
              <Card.Body>
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon icon={faTrophy} className={styles.cardIcon} />
                </div>
                <h3>متوسط الدرجات</h3>
                <div className={styles.scoreDisplay}>
                  <span className={styles.score}>{examStats.averageScore}%</span>
                </div>
                <p className={styles.statValue}>في {examStats.totalExams} اختبار</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Latest Activity Card */}
          <Col md={6} lg={3}>
            <Card className={styles.statsCard}>
              <Card.Body>
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon icon={faCalendar} className={styles.cardIcon} />
                </div>
                <h3>آخر نشاط</h3>
                <p className={styles.statValue}>{lastExamDate}</p>
                <Badge bg="info" className={styles.activityBadge}>
                  <FontAwesomeIcon icon={faCheck} /> مكتمل
                </Badge>
              </Card.Body>
            </Card>
          </Col>

          {/* Time Spent Card */}
          <Col md={6} lg={3}>
            <Card className={styles.statsCard}>
              <Card.Body>
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon icon={faClock} className={styles.cardIcon} />
                </div>
                <h3>الوقت المستغرق</h3>
                <p className={styles.statValue}>{examStats.totalTimeSpent}</p>
                <Badge bg="secondary" className={styles.timeBadge}>
                  <FontAwesomeIcon icon={faPercent} /> فعال
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="primary" className={styles.actionButton} onClick={onStartExam}>
              <FontAwesomeIcon icon={faListAlt} className="me-2" />
              بدء اختبار جديد
            </Button>
            <Button variant="outline-primary" className={styles.actionButton} onClick={onViewProgress}>
              <FontAwesomeIcon icon={faChartLine} className="me-2" />
              عرض التقدم التفصيلي
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
