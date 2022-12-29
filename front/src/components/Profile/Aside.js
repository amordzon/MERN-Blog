import React from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loggedOut } from '../../slices/authSlice';

const Aside = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser, isLogged } = useSelector(
        (state) => state.persistedReducer.auth
    );

    const handleClick = () => {
        dispatch(loggedOut());
        navigate('/');
    };
    console.log(isLogged);
    if (!isLogged) {
        return <Navigate to="/auth" />;
    }
    return (
        <>
            <aside className=" xl:w-1/5 lg:w-1/4 lg:h-screen lg:sticky lg:top-20 mt-2">
                <div className="overflow-y-auto py-2 px-3 bg-gray-50 lg:h-screen  shadow rounded">
                    <span className="self-center text-xl font-semibold whitespace-nowrap">
                        {currentUser.user.name} {currentUser.user.surname}
                    </span>
                    <ul className="space-y-2 lg:mt-2">
                        <li>
                            <Link
                                to="/profile/user"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <i className="fa-solid fa-address-card flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                                <span className="ml-3 ">My Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile/myposts"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <i className="fa-solid fa-file-lines flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>

                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    My Posts
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile/newpost"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <i className="fa-regular fa-plus flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Create new post
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile/inbox"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <i className="fa-solid fa-inbox flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                                <span className="flex-1 ml-3 whitespace-nowrap ">
                                    Inbox
                                </span>
                                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full">
                                    3
                                </span>
                            </Link>
                        </li>
                        <li className="lg:fixed lg:bottom-0 lg:pb-2">
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <i className="fa-solid fa-right-from-bracket  flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                                <button onClick={handleClick}>
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Logout
                                    </span>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <Outlet />
        </>
    );
};

export default Aside;
