import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { UpdateAction } from '../../actions/auth';
import { clearMessage } from '../../actions/message';

const Profile = () => {
    const [edit, setEdit] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);

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

        if (values.password && !values.oldpassword) {
            errors.oldpassword = 'Confirm your old password!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: currentUser.user.email,
            name: currentUser.user.name,
            surname: currentUser.user.surname,
            password: '',
            oldpassword: '',
        },
        validate,
        onSubmit: (values, { setSubmitting }) => {
            dispatch(
                UpdateAction(
                    values.email,
                    values.name,
                    values.surname,
                    values.password,
                    values.oldpassword
                )
            ).then(() => {
                dispatch(clearMessage());
                setEdit(false);
                setSubmitting(false);
            });
        },
    });

    return (
        <>
            <div className="h-full xl:w-4/5 text-center md:text-left lg:w-3/4 md:flex  md:shadow-xl md:mt-12 lg:mt-0 py-8 px-4 lg:py-16 lg:px-12">
                <div>
                    <div className="flex md:flex-none justify-center">
                        <div className="w-32 h-32 mx-6 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="mt-4 mx-10">
                        <h2 className="text-xl font-bold">
                            {currentUser.user.name} {currentUser.user.surname}
                        </h2>
                    </div>
                </div>
                {!edit ? (
                    <div className="lg:mt-4 lg:ml-6">
                        <div className="">
                            <address className="">
                                <div className="font-semibold">
                                    Email address
                                </div>
                                <div className="text-gray-700">
                                    {currentUser.user.email}
                                </div>
                                <div className="font-semibold mt-2">Name</div>
                                <div className="text-gray-700">
                                    {currentUser.user.name}
                                </div>
                                <div className="font-semibold mt-2">
                                    Surname
                                </div>
                                <div className="text-gray-700">
                                    {currentUser.user.surname}
                                </div>
                            </address>
                        </div>
                    </div>
                ) : (
                    <div className="lg:mt-4 lg:ml-6">
                        <div className="">
                            {message && (
                                <div className="form-group mb-4">
                                    <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <address className="">
                                <form
                                    className="space-y-4 md:space-y-6"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className="font-semibold">
                                        Email address
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                    />

                                    {formik.touched.email &&
                                    formik.errors.email ? (
                                        <div className="text-red-700 mb-3">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                    <div className="font-semibold mt-2">
                                        Name
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                    />

                                    {formik.touched.name &&
                                    formik.errors.name ? (
                                        <div className="text-red-700 mb-3">
                                            {formik.errors.name}
                                        </div>
                                    ) : null}
                                    <div className="font-semibold mt-2">
                                        Surname
                                    </div>
                                    <input
                                        type="text"
                                        name="surname"
                                        id="surname"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.surname}
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                    />
                                    {formik.touched.surname &&
                                    formik.errors.surname ? (
                                        <div className="text-red-700 mb-3">
                                            {formik.errors.surname}
                                        </div>
                                    ) : null}

                                    <div className="font-semibold mt-2">
                                        New password
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                    />

                                    {formik.touched.password &&
                                    formik.errors.password ? (
                                        <div className="text-red-700 mb-3">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}

                                    <div className="font-semibold mt-2">
                                        Old password
                                    </div>
                                    <input
                                        type="password"
                                        name="oldpassword"
                                        id="oldpassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                    />

                                    {formik.touched.oldpassword &&
                                    formik.errors.oldpassword ? (
                                        <div className="text-red-700 mb-3">
                                            {formik.errors.oldpassword}
                                        </div>
                                    ) : null}

                                    <input
                                        type="submit"
                                        value="Save"
                                        className="text-white bg-blue-700 hover:bg-blue-800 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    />
                                </form>
                            </address>
                        </div>
                    </div>
                )}
                <div className="ml-auto mt-2">
                    <button
                        onClick={() => {
                            setEdit(!edit);
                            dispatch(clearMessage());
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        {edit ? 'Cancel' : 'Edit'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;
