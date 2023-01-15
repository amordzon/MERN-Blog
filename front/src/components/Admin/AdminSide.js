import React from 'react';
import { Outlet } from 'react-router';
import { useNavigate, Navigate } from 'react-router';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggedOut } from '../../slices/authSlice';
const AdminSide = () => {
    const { pathname } = useLocation();

    const adminLogin = matchPath('/admin/login', pathname);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser, isLogged } = useSelector(
        (state) => state.persistedReducer.auth
    );

    const handleClick = () => {
        dispatch(loggedOut());
        navigate('/');
    };
    console.log(currentUser);
    console.log(isLogged);
    if (
        (!isLogged && !adminLogin) ||
        (currentUser?.user.role != 'admin' && !adminLogin)
    ) {
        return <Navigate to="/admin/login" />;
    }
    return (
        <>
            {isLogged && currentUser?.user.role == 'admin' && (
                <aside className=" xl:w-1/5 lg:w-1/4 lg:h-screen lg:sticky lg:top-16 mt-2">
                    <div className="overflow-y-auto py-2 px-3 bg-gray-50 lg:h-screen  shadow rounded">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">
                            {currentUser.user.name} {currentUser.user.surname}
                        </span>
                        <ul className="space-y-2 lg:mt-2">
                            <li>
                                <Link
                                    to="/admin/dashboard"
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                                >
                                    <i className="fa-solid fa-address-card flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                                    <span className="ml-3 ">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/posts"
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                                >
                                    <i className="fa-solid fa-file-lines flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>

                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Posts
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/users"
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                                >
                                    <i className="fa fa-users flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>

                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Users
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/csv"
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                                >
                                    <i className="fa-solid fa-file-csv flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>

                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        CSV
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
            )}
            <Outlet />
        </>
    );
};

export default AdminSide;
