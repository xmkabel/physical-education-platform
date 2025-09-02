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
    return (
      <div className="register-page">
        <div className="register-container">
          <div className="register-header">
            <h2 className="register-title">تم التسجيل بنجاح!</h2>
            <p className="register-subtitle">هلاً بيك دا كود الطالب بتاعك احفظ الكود جيداً ولو نسيته متقرفناش وروح كلم مشرف المادة</p>
          </div>

          <div className="credentials-container">
            <div className="credential-item">
              <label>كود الطالب:</label>
              <strong>{registrationData.code}</strong>
            </div>
            <div className="credential-item">
              <label>كلمة المرور:</label>
              <strong>{password}</strong>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')} 
            className="register-button"
          >
            الذهاب إلى تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-container">
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
