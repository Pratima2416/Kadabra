import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './verifycode.css';
import loginIcon from '../assets/login.svg';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendTimeout, setResendTimeout] = useState(null);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/set-new-password');
      } else {
        setError(data.message || 'Incorrect code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleResend = async () => {
    if (resendDisabled) return;

    try {
      const response = await fetch('http://localhost:5000/api/resend-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend code');
      }

      await response.json();
      alert('A new verification code has been sent to your email.');

      // Disable the button and start the timer
      setResendDisabled(true);
      setTimer(30); // 30 seconds countdown

      if (resendTimeout) {
        clearTimeout(resendTimeout);
      }
      const timeout = setTimeout(() => {
        setResendDisabled(false);
        setTimer(0);
      }, 30000); // 30 seconds
      setResendTimeout(timeout);
    } catch (error) {
      console.error('Error resending code:', error);
      alert('Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="verify-body">
      <div className="verify-wrapper">
        <div className="verify-code-page">
          {/* <div className="verify-code-container"> */}
            <h2 className="kadabra-logo">KADABRA</h2>
            <a href="/login" className="back-to-login">← Back to login</a>
            <h1>Verify Code</h1>
            <p>An authentication code has been sent to your email.</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="code-input"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="resend-code">
              <p>Didn't receive a code? <span
                onClick={handleResend}
                className={`resend-link ${resendDisabled ? 'disabled' : ''}`}
              >
                Resend {resendDisabled && timer > 0 ? `(${timer}s)` : ''}
              </span></p>
            </div>
            <button onClick={handleVerify} className="verify-button">Verify</button>
          {/* </div> */}
        </div>
        <div className="verify-image">
          <img src={loginIcon} alt="verify" />
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
