import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import Swal from 'sweetalert2';
import authHeader from '../../../services/auth-header';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            await axios
                .get(`${process.env.REACT_APP_API}/api/users`)
                .then((response) => {
                    const allUsers = response.data.Users;
                    setUsers(allUsers);
                });
        };

        getAllUsers();
    }, []);
    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete user!',
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios
                    .delete(`${process.env.REACT_APP_API}/api/users/${id}`, {
                        headers: authHeader(),
                    })
                    .then(() => {
                        const newUsers = users.filter((user) => user._id != id);
                        setUsers(newUsers);
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                        });
                    });
            }
        });
    };
    return (
        <div className="xl:w-4/5 lg:w-3/4">
            <div className=" xl:w-11/12 mx-auto mt-12">
                <div className="flex justify-between">
                    <h3 className="flex items-center text-2xl font-semibold mb-8 ml-4">
                        Users
                    </h3>
                    <div>
                        <Link to={`/admin/newuser`}>
                            <button className="mr-4 flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Add User
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => (
                                <tr
                                    className="bg-white border-b hover:bg-gray-50"
                                    key={index}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {user.name} {user.surname}
                                    </th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">
                                        {Moment(user.createdAt).format(
                                            'DD-MM-YYYY'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            to={`/admin/edituser/${user._id}`}
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="font-medium text-red-600 hover:text-red-800"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
