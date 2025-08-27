import { useState, useEffect } from 'react';
import './Login.css';
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // استخدام API الحقيقي لتسجيل الدخول

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    (async () => {
      try {
        const data = await authApi.login({ username, password, remember: rememberMe });
        storeTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken, remember: rememberMe });
        onLogin({ username: data?.user?.username || username, token: data.accessToken, rememberMe });
        setIsLoading(false);
        onClose();
      } catch (e) {
        setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة');
        setIsLoading(false);
      }
    })();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      // Prevent closing with ESC key
      e.preventDefault();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-backdrop" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="login-modal-container">
        <div className="login-modal-header">
          <h2 className="login-modal-title">تسجيل الدخول</h2>
          <p className="login-modal-subtitle">يرجى تسجيل الدخول للوصول إلى الاختبارات</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">اسم المستخدم</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">كلمة المرور</label>
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

          {loginError && (
            <div className="error-message">
              {loginError}
            </div>
          )}

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              تذكرني
            </label>
          </div>

          <button
            type="submit"
            className={login-button ${isLoading ? 'loading' : ''}}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>جاري تسجيل الدخول...</span>
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </button>

          
        </form>
      </div>
    </div>
  );
};

export default LoginModal;