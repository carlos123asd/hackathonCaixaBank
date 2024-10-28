import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../stores/authStore';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid
} from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const navigate = useNavigate();

    const defaultCredentials = {
        email: 'default@example.com',
        password: 'password123'
    };

    useEffect(() => {
        setTimeout(() => {
            setError('');
        },6000);
    },[error]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Validate that fields are not empty
        // Instructions:
        // - Check if the email and password fields are filled.
        if (!email || !password) {
            setError('Email y password necesarios');
            return;
        }

        // Validate credentials
        // Instructions:
        // - Check if the entered credentials match the default credentials or the stored user credentials.
        // - If valid, call the `login` function and navigate to the homepage.
        // - If invalid, set an error message.
        if(email === defaultCredentials.email && password === defaultCredentials.password){
            login({username: "AlexDev", email: defaultCredentials.email, password: defaultCredentials.password});
            navigate('/');
        }else{
            setError('Credenciales incorrectas');
            return;
        }
    };

    const handleShowDefaultCredentials = () => {
        // Show default credentials in case the user requests it
        if(!showCredentials){
            setEmail(defaultCredentials.email);
            setPassword(defaultCredentials.password);
            setShowCredentials(true);
        }else{
            setEmail('');
            setPassword('');
            setShowCredentials(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
                <Button
                    onClick={handleShowDefaultCredentials}
                >
                    {!showCredentials ? "Mostrar Credenciales" : "Ocultar Credenciales"}
                </Button>
            </form>

            {/* Show error message when applicable */}
            {/* - Use the Alert component to display the error message if one exists. */}
            {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}

            {error && (
                <>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <strong>Error: {error}</strong>
                    </Alert>
                    <Link to="/register" variant="body2" sx={{ display: 'block', textAlign: 'center' }} style={{color: 'inherit'}}>
                        ¿No tienes cuenta? Regístrate aquí
                    </Link>
                    <br />
                    <Link to="/register" variant="body2" sx={{ display: 'block', textAlign: 'center' }} style={{color: 'inherit'}}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </>
            )}
            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Email:</strong> {defaultCredentials.email}<br />
                    <strong>Password:</strong> {defaultCredentials.password}
                </Alert>
            )}
        </Box>
    );
}

export default LoginPage;
