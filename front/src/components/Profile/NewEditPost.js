import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const NewEditPost = ({ admin = false }) => {
    const [usersOptions, setUsersOptions] = useState([]);
    const navigate = useNavigate();
    const { user: currentUser } = useSelector(
        (state) => state.persistedReducer.auth
    );
    const { id } = useParams();
    const isAddMode = !id;
    const [diffCategory, setDiffCategory] = useState(false);
    const [post, setPost] = useState({
        title: '',
        body: '',
        category: '',
        categoryName: '',
        categoryDescription: '',
        img: '',
        users: [],
    });

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setPost({
            title: '',
            body: '',
            category: '',
            categoryName: '',
            categoryDescription: '',
            img: '',
            users: [],
        });
        axios
            .get(`${process.env.REACT_APP_API}/api/users`)
            .then(function (response) {
                const allUsers = response.data.Users;
                const allUsersReduce = allUsers.reduce((prev, curr) => {
                    return curr._id != currentUser.user._id
                        ? [
                              ...prev,
                              {
                                  value: curr._id,
                                  label: curr.email,
                              },
                          ]
                        : [...prev];
                }, []);
                setUsersOptions(allUsersReduce);
            });

        axios
            .get(`${process.env.REACT_APP_API}/api/category`)
            .then(function (response) {
                const allCategories = response.data.Categories;
                setCategories(allCategories);
            });
        if (isAddMode == false) {
            axios
                .get(`${process.env.REACT_APP_API}/api/posts/${id}`)
                .then((res) => {
                    const postValues = res.data.Post;
                    const selectedUsers = postValues.author.reduce(
                        (prev, curr) => {
                            return currentUser.user._id == curr._id
                                ? [...prev]
                                : [
                                      ...prev,
                                      {
                                          value: curr._id,
                                          label: curr.email,
                                      },
                                  ];
                        },
                        []
                    );
                    setPost({
                        title: postValues.title,
                        body: postValues.body,
                        category: postValues.category._id,
                        categoryName: '',
                        categoryDescription: '',
                        img: postValues.img,
                        users: selectedUsers,
                    });
                    formik.setFieldValue('title', post.title, false);
                    formik.setFieldValue('body', post.body, false);
                    formik.setFieldValue('category', post.category._id, false);
                    formik.setFieldValue('img', post.img, false);
                });
        }
    }, [id]);
    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = 'This field is required!';
        }
        if (!values.body) {
            errors.body = 'This field is required!';
        }
        if (!values.img) {
            errors.img = 'This field is required!';
        }

        if (
            !values.category &&
            (!values.categoryName || !values.categoryDescription)
        ) {
            errors.category = 'Category or new category required!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: post,
        enableReinitialize: true,
        validate,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (isAddMode) {
                createPost(values, resetForm, setSubmitting);
            } else {
                editPost(values, resetForm, setSubmitting);
            }
        },
    });

    const editPost = async (values, resetForm, setSubmitting) => {
        if (diffCategory) {
            await createCategory(values, setSubmitting);
        }
        if (values.categoryName == '' && values.categoryDescription == '') {
            const usersReduced = formik.values.users.reduce((prev, curr) => {
                return [...prev, curr.value];
            }, []);
            await axios
                .put(
                    `${process.env.REACT_APP_API}/api/posts/${id}`,
                    {
                        title: values.title,
                        body: values.body,
                        img: values.img,
                        category: values.category,
                        users: usersReduced,
                    },
                    {
                        headers: {
                            ...authHeader(),
                            'content-type': 'multipart/form-data',
                        },
                    }
                )
                .then(function (response) {
                    Swal.fire('Success!', response.data.message, 'success');
                    if (admin) {
                        navigate('/admin/posts');
                    } else {
                        navigate('/profile/newpost');
                    }
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message,
                    });
                });

            setSubmitting(false);
        }
    };

    const createCategory = async (values, setSubmitting) => {
        await axios
            .post(
                `${process.env.REACT_APP_API}/api/category/new`,
                {
                    name: values.categoryName,
                    description: values.categoryDescription,
                },
                {
                    headers: authHeader(),
                }
            )
            .then(function (response) {
                values.category = response.data.Category._id;
                values.categoryName = '';
                values.categoryDescription = '';
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                });
                setSubmitting(false);
            });
    };

    const createPost = async (values, resetForm, setSubmitting) => {
        if (diffCategory) {
            await createCategory(values, setSubmitting);
        }
        if (values.categoryName == '' && values.categoryDescription == '') {
            const usersReduced = formik.values.users.reduce((prev, curr) => {
                return [...prev, curr.value];
            }, []);
            await axios
                .post(
                    `${process.env.REACT_APP_API}/api/posts/new`,
                    {
                        title: values.title,
                        body: values.body,
                        img: values.img,
                        category: values.category,
                        users: usersReduced,
                    },
                    {
                        headers: {
                            ...authHeader(),
                            'content-type': 'multipart/form-data',
                        },
                    }
                )
                .then(function (response) {
                    Swal.fire('Success!', response.data.message, 'success');
                    resetForm();
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message,
                    });
                });

            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="mt-5 xl:w-4/5 lg:w-3/4 py-4 px-4 ">
                <h1 className="font-bold text-xl ml-2 my-4">
                    {isAddMode ? 'Create new post' : 'Edit post'}
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Add users to collaborate with
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <Select
                                            isMulti
                                            name="users"
                                            options={usersOptions}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            classNamePrefix="select"
                                            value={formik.values.users}
                                            onChange={(users) =>
                                                formik.setFieldValue(
                                                    'users',
                                                    users
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            required
                                            type="text"
                                            name="title"
                                            id="title"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.title}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            placeholder="Cute dogs"
                                        />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.title && formik.errors.title ? (
                                <div className="text-red-700 text-sm mb-3">
                                    {formik.errors.title}
                                </div>
                            ) : null}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Body
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        required
                                        id="body"
                                        name="body"
                                        rows="7"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.body}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="There are many dog breeds but..."
                                    ></textarea>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Your post content.
                                </p>
                            </div>

                            {formik.touched.body && formik.errors.body ? (
                                <div className="text-red-700 text-sm mb-3">
                                    {formik.errors.body}
                                </div>
                            ) : null}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.category}
                                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    <option></option>
                                    {categories?.length > 0 &&
                                        categories.map((category, index) => (
                                            <option
                                                value={category._id}
                                                key={index}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {formik.errors.category ? (
                                <div className="text-red-700 text-sm mb-3">
                                    {formik.errors.category}
                                </div>
                            ) : null}

                            <div className="flex items-center">
                                <input
                                    id="diffCategory"
                                    name="diffCategory"
                                    type="checkbox"
                                    onChange={() =>
                                        setDiffCategory(!diffCategory)
                                    }
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 dark:bg-gray-700"
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900">
                                    Different category
                                </label>
                            </div>

                            {diffCategory && (
                                <div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="categoryName"
                                                id="categoryName"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.categoryName
                                                }
                                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                placeholder="Dogs"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Category description
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="categoryDescription"
                                                name="categoryDescription"
                                                rows="7"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values
                                                        .categoryDescription
                                                }
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Category description"
                                            ></textarea>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description of your category.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Cover photo
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        formik.setFieldValue(
                                                            'img',
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, JPEG
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={formik.values.img.imageUrl}
                                alt={
                                    formik.values.img.imageUrl
                                        ? formik.values.img.imageUrl
                                        : formik.values.img.name
                                }
                            />

                            {formik.errors.img ? (
                                <div className="text-red-700 text-sm mb-3">
                                    {formik.errors.img}
                                </div>
                            ) : null}
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

export default NewEditPost;
