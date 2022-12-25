import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../actions/auth';

const Profile = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

    const handleClick = () => {
        dispatch(LogoutAction()).then(() => {
            navigate('/');
        });
    };
    if (!currentUser) {
        return <Navigate to="/auth" />;
    }
    return (
        <>
            <div>{currentUser.user.name}</div>
            <button onClick={handleClick}>WYloguj sie</button>
        </>
    );
};

export default Profile;
