import React from 'react';

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 border-gray-200 px-2 sm:px-4 py-2.5 rounded-b bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                        Blog
                    </span>
                </a>
                <div className="flex md:order-2">
                    <button
                        type="button"
                        data-collapse-toggle="navbar-search"
                        className="md:hidden text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 pl-8 text-sm text-gray-900 border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Szukaj..."
                        />
                    </div>
                    <button
                        data-collapse-toggle="navbar-search"
                        type="button"
                        className="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <button
                        type="button"
                        data-collapse-toggle="navbar-profile"
                        className="ml-3 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
                    >
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </button>
                </div>
                <div
                    className={
                        'items-center justify-between ' +
                        (!navbarOpen && 'hidden') +
                        ' w-full md:flex md:w-auto md:order-1'
                    }
                    id="navbar-search"
                >
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i
                                    className="fa fa-search"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 pl-10 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                            placeholder="Szukaj..."
                        />
                    </div>
                    <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white bg-gray-800 md:bg-gray-900 border-gray-700">
                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white"
                            >
                                Strona główna
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                            >
                                Podróże
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                            >
                                Zwierzęta
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                            >
                                Inne
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
