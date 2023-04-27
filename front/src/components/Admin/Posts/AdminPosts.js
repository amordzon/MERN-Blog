import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogPosts } from '../../../slices/articleSlice';
import Moment from 'moment';
import Swal from 'sweetalert2';
import authHeader from '../../../services/auth-header';
import { Link } from 'react-router-dom';

const AdminPosts = () => {
    const { posts: blogPosts } = useSelector((state) => state.article);
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllPosts = async () => {
            await axios
                .get(`${process.env.REACT_APP_API}/api/posts`)
                .then((response) => {
                    const allPosts = response.data.Posts;
                    dispatch(setBlogPosts(allPosts));
                });
        };

        getAllPosts();
    }, []);

    const approveDisapprovePost = async (id) => {
        await axios
            .put(
                `${process.env.REACT_APP_API}/api/posts/changevisibility/${id}`,
                {},
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                const newPosts = blogPosts.map((post) =>
                    post.id == id
                        ? { ...post, approved: response.data.Post.approved }
                        : post
                );
                dispatch(setBlogPosts(newPosts));
                Swal.fire(
                    'Visibility changed!',
                    "Post's visibility changed.",
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
    };
    const deletePost = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete post!',
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios
                    .delete(`${process.env.REACT_APP_API}/api/posts/${id}`, {
                        headers: authHeader(),
                    })
                    .then(() => {
                        const newPosts = blogPosts.filter(
                            (post) => post._id != id
                        );
                        dispatch(setBlogPosts(newPosts));
                        Swal.fire(
                            'Deleted!',
                            'Your post has been deleted.',
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
                        Posts
                    </h3>
                    <div>
                        <Link to={`/admin/newpost`}>
                            <button className="mr-4 flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Add Post
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Post title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Author
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
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
                            {blogPosts.map((post, index) => (
                                <tr
                                    className="bg-white border-b hover:bg-gray-50"
                                    key={index}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        <Link to={`/post/${post._id}`}>
                                            {post.title}
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {post.author.map((au, index) => (
                                            <div key={index}>{au.email}</div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.category.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {Moment(post.createdAt).format(
                                            'DD-MM-YYYY'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {post.approved ? (
                                            <button
                                                onClick={() =>
                                                    approveDisapprovePost(
                                                        post._id
                                                    )
                                                }
                                                title="Disapprove post"
                                                className="font-medium text-red-600 hover:text-red-800"
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    approveDisapprovePost(
                                                        post._id
                                                    )
                                                }
                                                title="Approve post"
                                                className="font-medium text-green-600 hover:text-green-800"
                                            >
                                                <i className="fa fa-check"></i>
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            to={`/admin/editpost/${post._id}`}
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deletePost(post._id)}
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

export default AdminPosts;
