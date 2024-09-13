// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Use Nodemailer or similar service
const crypto = require('crypto'); // To generate a unique verification code
const firebaseAdmin = require('./firebaseAdmin'); // Import Firebase Admin SDK
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());

// Generate a verification code
function generateVerificationCode() {
    return crypto.randomBytes(3).toString('hex'); // Generates a 6-digit hex code
}

// Endpoint to send password reset email with verification code
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        // Generate a verification code
        const verificationCode = generateVerificationCode();

        // Store the code and associated email in-memory or a database
        global.verificationCodes = global.verificationCodes || {};
        global.verificationCodes[email] = verificationCode;

        // Set up Nodemailer or another email service
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Verification Code',
            text: `Your verification code is: ${verificationCode}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Verification code sent successfully.' });
    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(500).json({ error: 'An error occurred while sending the verification code.' });
    }
});

// Endpoint to verify the code
app.post('/api/verify-code', (req, res) => {
    const { email, code } = req.body;

    if (!global.verificationCodes || global.verificationCodes[email] !== code) {
        return res.status(400).json({ error: 'Invalid verification code.' });
    }

    // Code is valid; remove it from memory
    delete global.verificationCodes[email];

    res.status(200).json({ message: 'Verification code is valid.' });
});

// Endpoint to resend the verification code
app.post('/api/resend-code', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        // Generate a new verification code
        const verificationCode = generateVerificationCode();

        // Update the verification code in memory
        global.verificationCodes = global.verificationCodes || {};
        global.verificationCodes[email] = verificationCode;

        // Set up Nodemailer or another email service
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your New Verification Code',
            text: `Your new verification code is: ${verificationCode}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'New verification code sent successfully.' });
    } catch (error) {
        console.error('Error resending verification code:', error);
        res.status(500).json({ error: 'An error occurred while resending the verification code.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

