import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import CountUp from 'react-countup';

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState({
        postsNum: 0,
        categoryNum: 0,
        usersNum: 0,
        commentsNum: 0,
    });
    const getStatistics = async () => {
        await axios
            .get('http://localhost:3000/api/admin/statistics', {
                headers: authHeader(),
            })
            .then((response) => {
                const stat = response.data.Statistics;
                setStatistics(stat);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getStatistics();
    }, []);
    return (
        <div className="xl:w-4/5 lg:w-3/4">
            <div className="mx-auto max-w-screen-sm lg:px-6 px-2 text-center my-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                    Statistics
                </h2>
                <p className="font-light text-gray-500 sm:text-xl ">
                    Important informations about your blog
                </p>
            </div>
            <div className="xl:w-3/4 mx-auto">
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between place-items-center">
                    <div>
                        <a
                            href="#"
                            className="block p-8 xl:p-16 xl:mt-4  max-w-sm p-6 text-center  bg-white border border-gray-200 rounded-lg shadow-md "
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                <CountUp end={statistics?.postsNum} />
                                &nbsp;Posts
                            </h5>
                            <p className="font-normal text-gray-700">
                                This blog consists of total 15 posts written by
                                different users.
                            </p>
                        </a>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="block p-8 xl:p-16 xl:mt-4 max-w-sm p-6 text-center  bg-white border border-gray-200 rounded-lg shadow-md "
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                <CountUp end={statistics?.categoryNum} />
                                &nbsp; Categories
                            </h5>
                            <p className="font-normal text-gray-700">
                                Total amount of categories of posts on this
                                site.
                            </p>
                        </a>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="block p-8 xl:p-16 xl:mt-4  max-w-sm p-6 text-center  bg-white border border-gray-200 rounded-lg shadow-md "
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                <CountUp end={statistics?.usersNum} />
                                &nbsp; Users
                            </h5>
                            <p className="font-normal text-gray-700">
                                Total amount of registered users on this site
                            </p>
                        </a>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="block p-8 xl:p-16 xl:mt-4  max-w-sm p-6 text-center  bg-white border border-gray-200 rounded-lg shadow-md "
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                <CountUp end={statistics?.commentsNum} />
                                &nbsp; comments
                            </h5>
                            <p className="font-normal text-gray-700">
                                This is how many comments users have written.
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
