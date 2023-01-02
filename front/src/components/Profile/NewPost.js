import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import Swal from 'sweetalert2';

const NewPost = () => {
    const [diffCategory, setDiffCategory] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/category')
            .then(function (response) {
                const allCategories = response.data.Categories;
                setCategories(allCategories);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
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
        initialValues: {
            title: '',
            body: '',
            category: '',
            categoryName: '',
            categoryDescription: '',
            img: '',
        },
        validate,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            if (diffCategory) {
                await axios
                    .post(
                        'http://localhost:3000/api/category/new',
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
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                        });
                        setSubmitting(false);
                    });
            }
            if (values.categoryName == '' && values.categoryDescription == '') {
                await axios
                    .post(
                        'http://localhost:3000/api/posts/new',
                        {
                            title: values.title,
                            body: values.body,
                            img: values.img,
                            category: values.category,
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
        },
    });
    return (
        <>
            <div className="mt-5 xl:w-4/5 lg:w-3/4 py-4 px-4 ">
                <h1 className="font-bold text-xl ml-2 my-4">Create new post</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Add users to collaborate with
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="email"
                                            name="users"
                                            id="users"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            placeholder="John@smith.com"
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
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewPost;
