import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminAddEditUsers = () => {
    const navigate = useNavigate();
    const [passwordStr, setPasswordStr] = useState('');
    const [initUserVal, setInitUserVal] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        confirmpassword: '',
        role: 'normal',
    });
    const { id } = useParams();
    const isAddMode = !id;
    useEffect(() => {
        setInitUserVal({
            email: '',
            name: '',
            surname: '',
            password: '',
            confirmpassword: '',
            role: 'normal',
        });
        if (isAddMode == false) {
            axios.get('http://localhost:3000/api/users/' + id).then((res) => {
                const userValues = res.data.User;

                setInitUserVal({
                    email: userValues.email,
                    name: userValues.name,
                    surname: userValues.surname,
                    password: '',
                    confirmpassword: '',
                    role: userValues.role,
                });
                console.log(res.data);
                formik.setFieldValue('email', initUserVal.email, false);
                formik.setFieldValue('name', initUserVal.name, false);
                formik.setFieldValue('surname', initUserVal.surname, false);
                formik.setFieldValue('role', initUserVal.role, false);
            });
        }
    }, [id]);
    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'This field is required!';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email!';
        }
        if (!values.name) {
            errors.name = 'This field is required!';
        }
        if (!values.surname) {
            errors.surname = 'This field is required!';
        }
        if (!values.password && isAddMode) {
            errors.password = 'This field is required!';
        } else {
            const atLeastOneUppercase = /[A-Z]/g;
            const atLeastOneLowercase = /[a-z]/g;
            const atLeastOneNumeric = /[0-9]/g;
            const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
            const eightCharsOrMore = /.{8,}/g;
            const passwordTracker = {
                uppercase: values.password.match(atLeastOneUppercase),
                lowercase: values.password.match(atLeastOneLowercase),
                number: values.password.match(atLeastOneNumeric),
                specialChar: values.password.match(atLeastOneSpecialChar),
                eightCharsOrGreater: values.password.match(eightCharsOrMore),
            };
            const passwordStrength = Object.values(passwordTracker).filter(
                (value) => value
            ).length;
            if (passwordStrength < 2 || values.password == '') {
                setPasswordStr('Password Strength: Weak');
            } else if (passwordStrength < 4) {
                setPasswordStr('Password Strength: Moderate');
            } else {
                setPasswordStr('Password Strength: Good');
            }
        }
        if (!values.confirmpassword && isAddMode) {
            errors.confirmpassword = 'This field is required!';
        } else if (values.password != values.confirmpassword) {
            errors.confirmpassword = 'Passwords are not the same!';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: initUserVal,
        enableReinitialize: true,
        validate,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            if (isAddMode) {
                axios
                    .post(
                        'http://localhost:3000/api/users/new',
                        {
                            email: values.email,
                            name: values.name,
                            surname: values.surname,
                            password: values.password,
                            role: values.role,
                        },
                        {
                            headers: authHeader(),
                        }
                    )
                    .then(function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'User has been added!',
                        });
                        resetForm();
                        setSubmitting(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                        });
                        setSubmitting(false);
                    });
            } else {
                axios
                    .put(
                        'http://localhost:3000/api/users/' + id,
                        {
                            email: values.email,
                            name: values.name,
                            surname: values.surname,
                            password: values.password,
                            role: values.role,
                        },
                        {
                            headers: authHeader(),
                        }
                    )
                    .then(function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'User has been updated!',
                        });
                        navigate('/admin/users');
                        setSubmitting(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                        });
                        setSubmitting(false);
                    });
            }
        },
    });
    return (
        <>
            <div className="mt-5 xl:w-4/5 lg:w-3/4 py-4 px-4 ">
                <h1 className="font-bold text-xl ml-2 my-4">Add new user</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            id="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>
                            </div>

                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-700 mb-3">
                                    {formik.errors.name}
                                </div>
                            ) : null}

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Lastname
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            required
                                            type="text"
                                            name="surname"
                                            id="surname"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.surname}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            placeholder="Smith"
                                        />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.surname && formik.errors.surname ? (
                                <div className="text-red-700 mb-3">
                                    {formik.errors.surname}
                                </div>
                            ) : null}

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            placeholder="John@Smith.com"
                                        />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-700 mb-3">
                                    {formik.errors.email}
                                </div>
                            ) : null}

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {isAddMode
                                            ? 'Password'
                                            : 'New Password'}
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className="text-red-700 mb-3">
                                    {formik.errors.password}
                                </div>
                            ) : null}
                            <div className="text-gray-700 mt-3">
                                {passwordStr}
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="password"
                                            name="confirmpassword"
                                            id="confirmpassword"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.confirmpassword
                                            }
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            {formik.touched.confirmpassword &&
                            formik.errors.confirmpassword ? (
                                <div className="text-red-700 mb-3">
                                    {formik.errors.confirmpassword}
                                </div>
                            ) : null}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    onChange={formik.handleChange}
                                    value={formik.values.role}
                                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    <option value="normal">Normal</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isAddMode ? 'Add' : 'Edit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminAddEditUsers;
