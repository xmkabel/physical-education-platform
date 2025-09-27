import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLoading } from "../../context/LoadingContext";
function Login() {
  const { login } = useAuth();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); // 👈 عشان الرسالة
  const [showPassword, setShowPassword] = useState(false); // 👈 حالة العين
  const navigate = useNavigate();
  // const { loading: globalLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await login(code, password);
      navigate("/redirect");
    } catch (error) {
      setError("كود المستخدم أو كلمة المرور غير صحيحة ⚠️"); // 👈 رسالة واضحة
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container shadow">
        <div className="login-header">
          <h2 className="login-title">تسجيل الدخول</h2>
          <p className="login-subtitle">
            يرجى تسجيل الدخول للوصول إلى الاختبارات
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              اسم المستخدم
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="أدخل كود المستخدم"
              required
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password" className="form-label">
              كلمة المرور
            </label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // 👈 تبديل
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
                disabled={isSubmitting}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </span>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>} {/* 👈 رسالة الخطأ */}

          <div>
            <a href="/register" className="register-link">
              ليس لديك حساب؟ سجل هنا
            </a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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

export default Login;
