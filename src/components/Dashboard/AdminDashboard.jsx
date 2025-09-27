import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faUsers, 
  faUserGraduate,
  faEdit,
  faTrash,
  faKey,
  faSignOut,
  faArrowLeft,
  faArrowRight,
  faSearch,
  faSort,
  faChartLine,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import { getStudents, getStudentStats, updateStudent, deleteStudent, updatePassword, formatDate } from '../../utils/studentUtils';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from '../../services/axios';


// added data to test
function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    code: '',
    preTest: 0,
    postTest: 0
  });
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const data = await axiosInstance.get('/rating-exams');
    return data.data;
  };

  useEffect(() => {
    const loadData = async () => {
      const students = await fetchStudents();
      setStudents(students);
  };
  loadData();
},[]);
console.log(students);

  const fetchAnalytics = async () => {
    const data = await get('/students-analytics');
    return data.data;
  };

  useEffect(() => {
    const loadAnalytics = async () => {
      const analytics = await fetchAnalytics();
      setAnalytics(analytics);
  };
  loadAnalytics();
},[]);
console.log(analytics);
  // Load initial data


  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const searchLower = searchTerm.toLowerCase();
      return (
        student.name.toLowerCase().includes(searchLower) ||
        student.code.toLowerCase().includes(searchLower) ||
        // Also search by test scores
        (student.rating_exams[0]?.score.toString() || '').includes(searchLower) ||
        (student.rating_exams[1]?.score.toString() || '').includes(searchLower)
      );
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') return a.name.localeCompare(b.name) * direction;
      if (sortField === 'code') return a.code.localeCompare(b.code) * direction;
      if (sortField === 'preTest') return (a.preTest - b.preTest) * direction;
      if (sortField === 'postTest') return (a.postTest - b.postTest) * direction;
      return 0;
    });

  // Handle edit student
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditForm({
      name: student.name,
      code: student.code,
      preTest: student.preTest || 0,
      postTest: student.postTest || 0
    });
    setShowEditModal(true);
  };

  // Handle password change
  const handlePasswordClick = (student) => {
    setSelectedStudent(student);
    setNewPassword('');
    setShowPasswordModal(true);
  };

  // Handle save edits
  const handleSaveEdit = () => {
    if (selectedStudent) {
      const result = updateStudent(selectedStudent.id, editForm);
      if (result) {
        // Refresh data
        setStudents(getStudents());
        setStats(getStudentStats());
      }
    }
    setShowEditModal(false);
  };

  // Handle save password
  const handleSavePassword = () => {
    if (selectedStudent && newPassword) {
      const result = updatePassword(selectedStudent.id, newPassword);
      if (result) {
        // Refresh data
        setStudents(getStudents());
      }
    }
    setShowPasswordModal(false);
  };

  // Handle delete student
  const handleDeleteStudent = (studentId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      const result = deleteStudent(studentId);
      if (result) {
        // Refresh data
        setStudents(getStudents());
        setStats(getStudentStats());
      }
    }
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <button 
          className="logoutButton position-absolute" 
          style={{ left: '2rem', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          تسجيل الخروج <FontAwesomeIcon icon={faSignOut} className="mx-2 fa-flip-horizontal" />
        </button>
        <button className="backButton" onClick={() => navigate("/exams")}>
          <FontAwesomeIcon icon={faArrowRight} className="backArrow" /> العودة
        </button>
        <h1 className="dashboardTitle">
          لوحة تحكم المسؤول
        </h1>
      </div>

      <Container className="py-4">
        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <div className="statCard">
              <FontAwesomeIcon icon={faUsers} className="statIcon" />
              <div>
                <h4>{analytics.all_users || 0}</h4>
                <p>إجمالي عدد الطلاب</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="statCard">
              <FontAwesomeIcon icon={faChartLine} className="statIcon" />
              <div>
                <h4>{analytics.pre || 0}</h4>
                <p>أكملوا الاختبار القبلي</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="statCard">
              <FontAwesomeIcon icon={faUserGraduate} className="statIcon" />
              <div>
                <h4>{analytics.post || 0}</h4>
                <p>أكملوا الاختبار البعدي</p>
              </div>
            </div>
          </Col>
          {/* <Col md={3}>
            <div className="statCard">
              <FontAwesomeIcon icon={faSyncAlt} className="statIcon" />
              <div>
                <h4>{(stats.averageImprovement || 0).toFixed(1)}%</h4>
                <p>متوسط التحسن</p>
              </div>
            </div>
          </Col> */}
        </Row>

        {/* Students Table Card */}
        <Card className="cardD">
          <Card.Header className="cardHeader d-flex justify-content-between align-items-center">
            <div>
              <FontAwesomeIcon icon={faUser} className="mx-2" />
                قائمة الطلاب 
            </div>
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder=" بالاسم أو الكود أو الدرجة"
                  className="search-input "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="position-absolute top-50 start-0 translate-middle-y mx-2 text-muted"
                />
              </div>
              {/* {searchTerm && (
                <Button 
                  variant="link" 
                  className="text-light ms-2"
                  onClick={() => setSearchTerm('')}
                >
                  مسح
                </Button>
              )} */}
            </div>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table className="table-striped table-hover">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                      اسم الطالب {sortField === 'name' && <FontAwesomeIcon icon={faSort} />}
                    </th>
                    <th onClick={() => handleSort('code')} style={{ cursor: 'pointer' }}>
                      كود الطالب {sortField === 'code' && <FontAwesomeIcon icon={faSort} />}
                    </th>
                    <th onClick={() => handleSort('preTest')} style={{ cursor: 'pointer' }}>
                      الاختبار القبلي {sortField === 'preTest' && <FontAwesomeIcon icon={faSort} />}
                    </th>
                    <th onClick={() => handleSort('postTest')} style={{ cursor: 'pointer' }}>
                      الاختبار البعدي {sortField === 'postTest' && <FontAwesomeIcon icon={faSort} />}
                    </th>
                    <th>التحسن</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const improvement = student.rating_exams[1]?.score - student.rating_exams[0]?.score;
                    const hasPreTest = student.rating_exams[0]?.score;
                    const hasPostTest = student.rating_exams[1]?.score ;
                    const hasBothTests = hasPreTest && hasPostTest;
                    return (
                      <tr key={student.id} className="student-table-row">
                        <td className="student-table-name">{student.name}</td>
                        <td className="student-table-code">{student.code}</td>
                        <td className="student-table-pretest">
                          {hasPreTest ? (
                            <div>
                              <div>{student.rating_exams[0]?.score}%</div>
                              <small className="text-muted">
                                {formatDate(student.rating_exams[0]?.created_at)}
                              </small>
                            </div>
                          ) : '-'}
                        </td>
                        <td className="student-table-posttest">
                          {hasPostTest ? (
                            <div>
                              <div>{student.rating_exams[1]?.score}%</div>
                              <small className="text-muted">
                                {formatDate(student.rating_exams[1]?.created_at)}
                              </small>
                            </div>
                          ) : '-'}
                        </td>
                        <td className={`student-table-improvement ${hasBothTests ? (improvement > 0 ? 'text-success' : 'text-danger') : ''}`}>
                          {hasBothTests ? (
                            <strong>{improvement > 0 ? '+' : ''}{improvement}%</strong>
                          ) : '-'}
                        </td>
                        <td className="student-table-actions">
                          <div className="d-flex flex-nowrap gap-2 justify-content-center align-items-center">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleEditClick(student)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button 
                              variant="outline-warning" 
                              size="sm"
                              onClick={() => handlePasswordClick(student)}
                            >
                              <FontAwesomeIcon icon={faKey} />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Edit Student Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} dir="rtl">
        <Modal.Header>
          <Modal.Title>تعديل بيانات الطالب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>اسم الطالب</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>كود الطالب</Form.Label>
              <Form.Control
                type="text"
                value={editForm.code}
                onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>درجة الاختبار القبلي</Form.Label>
              <Form.Control
                type="number"
                value={editForm.preTest}
                onChange={(e) => setEditForm({ ...editForm, preTest: Number(e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>درجة الاختبار البعدي</Form.Label>
              <Form.Control
                type="number"
                value={editForm.postTest}
                onChange={(e) => setEditForm({ ...editForm, postTest: Number(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            حفظ التغييرات
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} dir="rtl">
        <Modal.Header>
          <Modal.Title>تغيير كلمة المرور</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>كلمة المرور الجديدة</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleSavePassword}>
            حفظ كلمة المرور
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;