import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faKey, 
  faIdCard, 
  faUser, 
  faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';
import './Welcome.css';

function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentData } = location.state || {};

  // Redirect if no data
  if (!studentData) {
    navigate('/register');
    return null;
  }

  const { firstName, lastName, code, password } = studentData;

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-header">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h2 className="welcome-title">مرحباً بك يا {firstName}  في منصة التربية الرياضية</h2>
          <p className="welcome-subtitle">تم تسجيل حسابك بنجاح! احتفظ بهذه المعلومات في مكان آمن.</p>
        </div>

        <div className="student-info">
          {/* <div className="info-card">
            <div className="info-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="info-content">
              <label>اسم الطالب</label>
              <strong>{`${firstName} ${lastName}`}</strong>
            </div>
          </div> */}

          <div className="info-card">
            <div className="info-icon">
              <FontAwesomeIcon icon={faIdCard} />
            </div>
            <div className="info-content">
              <label>كود الطالب</label>
              <strong>{code}</strong>
            </div>
          </div>

          {/* <div className="info-card">
            <div className="info-icon">
              <FontAwesomeIcon icon={faKey} />
            </div>
            <div className="info-content">
              <label>كلمة المرور</label>
              <strong>{password}</strong>
            </div>
          </div> */}
        </div>

        <div className="welcome-actions">
          <p className="warning-text">
            يرجى الاحتفاظ بهذه المعلومات. في حالة نسيان الكود ، يرجى التواصل مع مشرف المادة.
          </p>
          <button 
            onClick={() => navigate('/login')} 
            className="login-button"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="m-5" />
            الذهاب إلى تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;