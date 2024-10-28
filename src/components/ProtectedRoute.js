import React from 'react';
import { Outlet } from 'react-router-dom';
import LoginPage from './LoginPage';

function ProtectedRoute({ isAuthenticated }) {
    // Instructions:
    // - Check if the user is authenticated.
    // - If the user is not authenticated, redirect them to the login page.
    // - If the user is authenticated, render the child components using <Outlet />.
    return isAuthenticated ? <Outlet /> : <LoginPage />;
}

export default ProtectedRoute;