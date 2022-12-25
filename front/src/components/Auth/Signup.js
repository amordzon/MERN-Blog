import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { RegisterAction } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const Signup = ({ isLogin }) => {
    const [passwordStr, setPasswordStr] = useState('');
    let navigate = useNavigate();
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
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
        if (!values.password) {
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
        if (!values.confirmpassword) {
            errors.confirmpassword = 'This field is required!';
        } else if (values.password != values.confirmpassword) {
            errors.confirmpassword = 'Passwords are not the same!';
        }

        if (!values.terms) {
            errors.terms = 'This field is required!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            surname: '',
            password: '',
            confirmpassword: '',
            terms: false,
        },
        validate,
        onSubmit: (values, { setSubmitting }) => {
            dispatch(
                RegisterAction(
                    values.email,
                    values.name,
                    values.surname,
                    values.password
                )
            ).then(() => {
                navigate('/profile');
                setSubmitting(false);
            });
        },
    });

    return (
        <section className="">
            <div className="flex flex-col items-center  px-6 py-4 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
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
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="John"
                                    required=""
                                />

                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-700 mb-3">
                                        {formik.errors.name}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Lastname
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.surname}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Smith"
                                    required=""
                                />
                                {formik.touched.surname &&
                                formik.errors.surname ? (
                                    <div className="text-red-700 mb-3">
                                        {formik.errors.surname}
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
                                <div className="text-gray-700 mt-3">
                                    {passwordStr}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmpassword}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required=""
                                />
                                {formik.touched.confirmpassword &&
                                formik.errors.confirmpassword ? (
                                    <div className="text-red-700 mb-3">
                                        {formik.errors.confirmpassword}
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.terms}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="font-light text-gray-500">
                                        I accept the{' '}
                                        <a className="font-medium text-primary-600 ">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            {formik.touched.terms && formik.errors.terms ? (
                                <div className="text-red-700 mb-3">
                                    {formik.errors.terms}
                                </div>
                            ) : null}
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{' '}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline"
                                    onClick={() => isLogin(true)}
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
