import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import './ForgotPassword.css';

import { auth, provider, appleProvider, signInWithPopup } from '../googlesignin/config'; // Imported appleProvider

import facebookIcon from '../assets/facebook.svg';
import googleIcon from '../assets/googlee.svg';
import appleIcon from '../assets/apple.svg';
import instagramIcon from '../assets/instagram.svg';
import linkedinIcon from '../assets/linkedin.svg';
import registerIcon from '../assets/register.svg';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Password reset email sent to:', email);
                navigate('/verifycode');
            } else {
                console.error(data.error || 'Failed to send password reset email');
                alert('Failed to send password reset email. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the password reset email.');
        }
    };

    // Function to handle Google sign-in
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userEmail = result.user.email;
            console.log("Signed in with Google:", userEmail);
            navigate('/travel-gateways'); // Redirect to travel-gateways page after successful login
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
        }
    };

    // Function to handle Apple sign-in
    const handleAppleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, appleProvider); // Using appleProvider to sign in with Apple
            const userEmail = result.user.email;
            console.log("Signed in with Apple:", userEmail);
            navigate('/travel-gateways'); // Redirect to travel-gateways page after successful login
        } catch (error) {
            console.error('Error signing in with Apple:', error.message);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-wrapper">
            <div className="fogot-container">
                <div className="forgot-header">
                    <h1 className="forgot-title">KADABRA</h1>
                    <Link to="/login" className="back-to-login">
                        <span>&larr; Back to login</span>
                    </Link>
                </div>
                <h2>Forgot your password?</h2>
                <p>Don’t worry, happens to all of us. Enter your email below to recover your password</p>
                <form onSubmit={handleSubmit}>
                    <div className="forgot-input-group">
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
                    <button type="submit" className="forgot-submit-btn">Submit</button>
                </form>
                <div className="forgot-social-login">
                    <p className="forgot-or-text">Or login with</p>
                    <div className="forgot-social-icons">
                        <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
                        <a href="#" onClick={handleGoogleLogin}>
                            <img src={googleIcon} alt="Google" />
                        </a>
                        <a href="#" onClick={handleAppleLogin}>
                            <img src={appleIcon} alt="Apple" />
                        </a>
                        <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
                        <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
                    </div>
                </div>
            </div>
            <div className="forgot-image">
            <img src={registerIcon} alt="register" />
            </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
