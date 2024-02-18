import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loggedIn } from '../../slices/authSlice';
import { login } from '../../services/auth.service';

const Login = ({ isLogin, admin = false }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'This field is required!';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email!';
        }
        if (!values.password) {
            errors.password = 'This field is required!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values, { setSubmitting }) => {
            login(values.email, values.password)
                .then((response) => {
                    if (admin) {
                        if (response.User.user.role == 'admin') {
                            dispatch(loggedIn(response.User));
                            navigate('/admin/dashboard');

                            setSubmitting(false);
                        } else {
                            setMessage('You are not an admin!');
                        }
                    } else {
                        dispatch(loggedIn(response.User));
                        navigate('/profile/myposts');
                        setSubmitting(false);
                    }
                })
                .catch((error) => {
                    setMessage(() => error.response.data.message);
                });
        },
    });

    return (
        <section className="">
            <div className="flex flex-col items-center  px-6 py-4 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            {admin
                                ? 'Sign in to admin panel'
                                : 'Sign in to your account'}
                        </h1>

                        {message && (
                            <div className="form-group">
                                <div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required=""
                                />

                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-700 mb-3">
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required=""
                                />

                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <div className="text-red-700 mb-3">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>

                            {!admin && (
                                <p className="text-sm font-light text-gray-500">
                                    Dont have an account yet?{' '}
                                    <a
                                        href="#"
                                        className="font-medium text-primary-600 hover:underline"
                                        onClick={() => isLogin(false)}
                                    >
                                        Sign up
                                    </a>
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
