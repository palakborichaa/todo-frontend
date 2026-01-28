import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(
        "https://todo-backend-zj2u.onrender.com/api/auth/register",
        formData
      );

      setSuccess(true);
      setMessage(res.data.message || 'Verification email sent');

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    setResending(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.post(
        'https://todo-backend-zj2u.onrender.com/api/auth/resend-verification'
,
        { email: formData.email }
      );

      setMessage(res.data.message || 'Verification email resent');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        {!success ? (
          <>
            <h2>Register</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter username"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </>
        ) : (
          <>
            <h2>Verify your email</h2>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <p>
              We’ve sent a verification link to:
              <br />
              <strong>{formData.email}</strong>
            </p>

            <p>Please check your inbox and click the link to activate your account.</p>

            <button onClick={resendVerification} disabled={resending}>
              {resending ? 'Resending...' : 'Resend verification email'}
            </button>

            <p style={{ marginTop: '16px' }}>
              After verification, you can <a href="/login">login here</a>.
            </p>
          </>
        )}

      </div>
    </div>
  );
};
