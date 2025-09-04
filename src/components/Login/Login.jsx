import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ حالة جديدة
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // ✅ أول ما يبدأ

    try {
      await login(code, password);
      navigate("/redirect");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false); // ✅ مهما حصل رجّع الزرار لحالته
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
              disabled={isSubmitting} // ✅ يمنع الكتابة أثناء التحميل
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
              disabled={isSubmitting} // ✅ يمنع الكتابة أثناء التحميل
            />
          </div>

          <div>
            <a href="/register" className="register-link">
              ليس لديك حساب؟ سجل هنا
            </a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting} // ✅ يمنع الضغط المتكرر
          >
            {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"} {/* ✅ يتغير النص */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
