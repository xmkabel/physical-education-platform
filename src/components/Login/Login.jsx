import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import './login.css'
import { login } from "../../services/authService";

function Login() {
  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(code, password);

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
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

          <button
            type="submit"
            className={`login-button `}

          >

              تسجيل الدخول

          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
