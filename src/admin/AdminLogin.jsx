import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 800));
    const success = login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Try admin / admin123');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Shapes */}
      <div className="login-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon"><i className="fas fa-flask"></i></div>
          <h2>Welcome Back</h2>
          <p>Sign in to manage your Crest Bioscientific dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username */}
          <div className="form-group floating">
            <i className="fas fa-user input-icon"></i>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
            {/* Label disappears when username has value */}
            {!username && (
              <label htmlFor="username">Username</label>
            )}
          </div>

          {/* Password */}
          <div className="form-group floating">
            <i className="fas fa-lock input-icon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Label disappears when password has value */}
            {!password && (
              <label htmlFor="password">Password</label>
            )}
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> Logging in...</>
            ) : (
              <><i className="fas fa-sign-in-alt"></i> Sign In</>
            )}
          </button>

          <div className="login-footer">
            <span className="demo-cred">Demo: admin / admin123</span>
          </div>
        </form>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0b1a2e;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .login-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          animation: floatShape 20s infinite alternate ease-in-out;
          opacity: 0.3;
        }

        .shape-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(122, 155, 203, 0.15), transparent 70%);
          top: -200px;
          right: -200px;
          animation-duration: 25s;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(122, 155, 203, 0.10), transparent 70%);
          bottom: -100px;
          left: -100px;
          animation-duration: 30s;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-duration: 35s;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(122, 155, 203, 0.08), transparent 70%);
          bottom: 20%;
          right: 20%;
          animation-duration: 28s;
          animation-delay: 1s;
        }

        @keyframes floatShape {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(30px, -40px) scale(1.1) rotate(5deg); }
          66% { transform: translate(-20px, 20px) scale(0.9) rotate(-3deg); }
          100% { transform: translate(10px, -10px) scale(1.05) rotate(2deg); }
        }

        .login-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 48px 40px 40px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .login-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .login-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .logo-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, #7a9bcb, #1a4a7a);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #fff;
          box-shadow: 0 8px 24px rgba(26, 74, 122, 0.3);
          transition: transform 0.3s ease;
        }

        .login-card:hover .logo-icon {
          transform: scale(1.05) rotate(-2deg);
        }

        .login-header h2 {
          color: #ffffff;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }

        .login-header p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-group .input-icon {
          position: absolute;
          left: 16px;
          color: rgba(255, 255, 255, 0.25);
          font-size: 1rem;
          transition: 0.3s;
          pointer-events: none;
          z-index: 1;
        }

        .form-group input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          font-size: 1rem;
          color: #ffffff;
          transition: 0.3s;
          font-family: inherit;
          outline: none;
        }

        .form-group input:focus {
          border-color: #7a9bcb;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 4px rgba(122, 155, 203, 0.08);
        }

        /* Label - disappears when input has value */
        .form-group label {
          position: absolute;
          left: 48px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.95rem;
          pointer-events: none;
          transition: none;
          font-weight: 500;
        }

        .form-group input:focus ~ .input-icon {
          color: #7a9bcb;
        }

        .toggle-password {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.25);
          cursor: pointer;
          font-size: 1rem;
          padding: 4px;
          transition: 0.3s;
          z-index: 1;
        }

        .toggle-password:hover {
          color: rgba(255, 255, 255, 0.6);
        }

        .error-message {
          background: rgba(192, 57, 43, 0.12);
          border-left: 3px solid #c0392b;
          padding: 12px 16px;
          border-radius: 10px;
          color: #e74c3c;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: shake 0.5s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        .login-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #1a4a7a, #0b1a2e);
          border: none;
          border-radius: 14px;
          font-size: 1.05rem;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: inherit;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(26, 74, 122, 0.2);
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(26, 74, 122, 0.35);
        }

        .login-btn:active:not(:disabled) {
          transform: scale(0.97);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .login-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent 60%);
          opacity: 0;
          transition: 0.5s;
          pointer-events: none;
        }

        .login-btn:hover:not(:disabled)::after {
          opacity: 1;
        }

        .login-btn i {
          font-size: 1.1rem;
        }

        .login-footer {
          text-align: center;
          margin-top: 8px;
        }

        .demo-cred {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.5px;
          background: rgba(255, 255, 255, 0.03);
          padding: 4px 16px;
          border-radius: 40px;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px 28px;
          }
          .login-header h2 {
            font-size: 1.5rem;
          }
          .form-group input {
            padding: 14px 14px 14px 44px;
            font-size: 0.95rem;
          }
          .form-group label {
            left: 44px;
            font-size: 0.9rem;
          }
          .login-btn {
            padding: 14px;
            font-size: 1rem;
          }
          .bg-shape {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;