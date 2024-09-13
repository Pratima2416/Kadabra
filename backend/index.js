// backend/index.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Route for LinkedIn OAuth callback
app.get('/auth/linkedin/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            },
        });
        const { access_token } = response.data;
        // Use the access token to fetch user profile, etc.
        res.send('LinkedIn login successful!');
    } catch (error) {
        console.error('Error during LinkedIn OAuth callback:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
