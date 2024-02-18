import React from 'react';
import Login from '../Auth/Login';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const AdminLogin = () => {
    const { user: currentUser, isLogged } = useSelector(
        (state) => state.persistedReducer.auth
    );
    if (isLogged && currentUser.user.role == 'admin') {
        return <Navigate to="/admin/dashboard" />;
    }

    return (
        <div className="w-full py-16 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4 bg-gray-50">
            <Login admin={true} />
        </div>
    );
};

export default AdminLogin;
