import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Auth = () => {
    const { isLogged } = useSelector((state) => state.persistedReducer.auth);
    const [login, setLogin] = useState(true);

    const setLoginRegister = (isLogin) => {
        setLogin(isLogin);
    };

    if (isLogged) {
        return <Navigate to="/profile/myposts" />;
    }
    return (
        <div className="w-full py-16 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4 bg-gray-50">
            {login == true ? (
                <Login isLogin={setLoginRegister} />
            ) : (
                <Signup isLogin={setLoginRegister} />
            )}
        </div>
    );
};

export default Auth;
