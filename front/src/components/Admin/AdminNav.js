import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav className="sticky top-0 z-50 border-gray-200 px-2 sm:px-4 py-2.5 rounded-b bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to="/admin/login" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                        Blog - Admin Panel
                    </span>
                </Link>
                <Link to="/" className="flex items-center">
                    <button
                        type="button"
                        data-collapse-toggle="navbar-search"
                        className=" text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
                    >
                        Go to Blog
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default AdminNav;
