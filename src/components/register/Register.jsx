import React, { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/register', {
        first_name: firstName,
        last_name: lastName,
        password: password,
        password_confirmation: confirmPassword
      });

      setRegistrationData(response.data);
      setRegistrationSuccess(true);
      setIsLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "حدث خطأ في التسجيل");
      setIsLoading(false);
    }
    console.log(registrationData);
    
  };


  
  if (registrationSuccess && registrationData) {
  navigate('/welcome', {
    state: {
      studentData: {
        firstName,
        lastName,
        code: registrationData.code // خد الكود من البيانات المخزنة
      }
    }
  });
  return null;
}


  return (
    <div className="register-page">
      <div className="register-container shadow">
        <div className="register-header">
          <h2 className="register-title">تسجيل حساب جديد</h2>
          <p className="register-subtitle">
            يرجى ملء البيانات التالية للتسجيل
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              الاسم الأول
            </label>
            <input
              id="firstName"
              type="text"
              className="form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="أدخل الاسم الأول"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              الاسم الأخير
            </label>
            <input
              id="lastName"
              type="text"
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="أدخل الاسم الأخير"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              تأكيد كلمة المرور
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="أدخل تأكيد كلمة المرور"
              required
            />
          </div>
          <div>
            <a href="/login" className="register-link">هل لديك حساب؟ تسجيل الدخول</a>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>جاري التسجيل...</span>
              </>
            ) : (
              'تسجيل'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
