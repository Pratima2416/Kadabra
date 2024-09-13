import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

import { auth, createUserWithEmailAndPassword } from '../googlesignin/config';

import registerIcon from '../assets/register.svg';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // List of common disposable email providers
    const disposableEmailProviders = [
        'mailinator.com',
        'tempmail.com',
        'maildrop.cc',
        'guerrillamail.com',
        // Add more disposable providers as needed
    ];

    // Function to validate email
    const isValidEmail = (email) => {
        const isValidFormat = emailRegex.test(email);
        const domain = email.split('@')[1];
        const isDisposable = disposableEmailProviders.includes(domain);
        return isValidFormat && !isDisposable;
    };

    // Function to handle registration
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!termsAccepted) {
            setError('You must accept the terms and conditions.');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('Registration successful! Please check your email for verification.');
            setError(''); // Clear any previous error messages
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Error registering user:', error.message);
            setError('Failed to register. Please try again.');
            setSuccess(''); // Clear any previous success messages
        }
    };

    return (
        <div className="register-container">
            <div className="registration-form">
                <h1>KADABRA</h1>
                <h2>Register</h2>
                <p>Let's get you all set up so you can access your personal account.</p>
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    <div className="register-input-row">
                        <div className="register-input-group">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="register-input-group">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="register-checkbox-group">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                        />
                        <label htmlFor="terms">
                            I agree to all the <a href="#">Terms and Privacy Policies</a>
                        </label>
                    </div>
                    {/* Display success or error messages */}
                    {success && <p className="register-success-text">{success}</p>}
                    {error && <p className="register-error-text">{error}</p>}
                    <div className="register-button-container">
                        <button type="submit">Create account</button>
                    </div>
                    <p className="register-login-text">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
            <div className="register-image">
                <img src={registerIcon} alt="register" />
            </div>
        </div>
    );
}

export default Register;
