const testEmail = async () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Test Email',
        text: 'This is a test email.',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Test email sent successfully.');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
};

testEmail();
