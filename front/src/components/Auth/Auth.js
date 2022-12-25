import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../../actions/message';

const Auth = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [login, setLogin] = useState(true);

    const dispatch = useDispatch();
    const setLoginRegister = (isLogin) => {
        dispatch(clearMessage());
        setLogin(isLogin);
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
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
