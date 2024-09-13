import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import Firebase authentication and providers
import { auth, provider, appleProvider, signInWithPopup, signInWithEmailAndPassword } from '../googlesignin/config';

// Import assets and CSS
import '../index.css';
import facebookIcon from '../assets/facebook.svg';
import googleIcon from '../assets/googlee.svg';
import appleIcon from '../assets/apple.svg';
import instagramIcon from '../assets/instagram.svg';
import linkedinIcon from '../assets/linkedin.svg';
import loginIcon from '../assets/login.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle Google sign-in
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userEmail = result.user.email;
            setEmail(userEmail);
            localStorage.setItem('email', userEmail);
            navigate('/travel-gateways');
        } catch (error) {
            console.error('Error signing in with Google: ', error.message);
        }
    };

    // Function to handle Apple sign-in
    const handleAppleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, appleProvider);
            const userEmail = result.user.email;
            localStorage.setItem('email', userEmail);
            navigate('/travel-gateways');
        } catch (error) {
            console.error('Error signing in with Apple: ', error.message);
        }
    };

    // Function to handle LinkedIn login
    const handleLinkedInLogin = () => {
        const clientId = '864f8gxuvobz1c'; // LinkedIn Client ID
        const redirectUri = 'http://localhost:3000/travel-gateways'; // Your redirect URI
        const scope = 'r_liteprofile r_emailaddress'; // Define the scope of access
        const state = 'some_random_string'; // You can generate a random string for security

        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;

        // Redirect to LinkedIn authorization page
        window.location.href = authUrl;
    };

    // Function to handle manual sign-in with email and password
    const handleManualLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const userEmail = result.user.email;
            setEmail(userEmail);
            localStorage.setItem('email', userEmail);
            setError(''); // Clear any previous error messages
            navigate('/travel-gateways');
        } catch (error) {
            console.error('Error signing in with email and password: ', error.message);
            setError('Email or password is incorrect.');
        }
    };

    // useEffect to load the email from localStorage on component mount
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            navigate('/travel-gateways');
        }
    }, [navigate]);

    return (
        <div className="container">
            <div className="login-wrapper">
                <div className="login-form">
                    <h1 className="title">KADABRA</h1>
                    <p className="welcome-text">Welcome back! Glad to see you, Again!</p>
                    <form onSubmit={handleManualLogin}>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="toggle-password" onClick={togglePassword}>👁</span>
                        </div>
                        {error && <p className="error-text">{error}</p>}
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" id="remember" /> Remember me
                            </label>
                            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    <p className="signup-text">Don't have an account? <Link to="/register">Sign up</Link></p>
                    <div className="social-login">
                        <p className="or-text">Or login with</p>
                        <div className="social-icons">
                            <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
                            <a href="#" onClick={handleGoogleLogin}>
                                <img src={googleIcon} alt="Google" />
                            </a>
                            <a href="#" onClick={handleAppleLogin}>
                                <img src={appleIcon} alt="Apple" />
                            </a>
                            <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
                            <a href="#" onClick={handleLinkedInLogin}>
                                <img src={linkedinIcon} alt="LinkedIn" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="image-side">
                    <img src={loginIcon} alt="Login" />
                </div>
            </div>
        </div>
    );
}

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
}

export default Login;
