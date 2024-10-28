import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function ForgotPasswordPage() {
    const [email, setEmail] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setMessage('');
            return;
        }

        if (email === 'user@example.com') {
            setMessage('A password reset link has been sent to your email.');
            setError('');
        } else {
            setError('Email not found. Please try again.');
            setMessage('');
        }
    };

    return (
        <Box sx={{ mt: 8, maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Send Reset Link
                </Button>
            </form>
            {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
            {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
}

export default ForgotPasswordPage;
