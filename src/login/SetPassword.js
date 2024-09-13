import React, { useState } from 'react';
import './SetPassword.css';

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            alert("Password has been successfully set!");
            // Add logic to handle password reset here
        } else {
            alert("Passwords do not match. Please try again.");
        }
    };

    return (
        <div className="set-password-container">
            <div className="set-password-form">
                <h1 className="logo">KADABRA</h1>
                <h2>Set a password</h2>
                <p>Your previous password has been reset. Please set a new password for your account.</p>
                <form onSubmit={handleSubmit}>
                    <label>Create Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Create Password"
                        required 
                    />
                    <label>Re-enter Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Re-enter Password"
                        required 
                    />
                    <button type="submit">Set password</button>
                </form>
            </div>
            <div className="set-password-image">
                <img src="/path-to-your-image.png" alt="Password Illustration" />
            </div>
        </div>
    );
}

export default SetPassword;
