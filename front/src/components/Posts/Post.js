import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

const Post = ({ post, myPosts, handleDelete }) => {
    const { user: currentUser } = useSelector(
        (state) => state.persistedReducer.auth
    );
    const truncate = (str) => {
        return str.length > 200 ? str.slice(0, 198) + '...' : str;
    };
    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(truncate(post.body)),
    });

    const authorFound = post.author.some((aut) => {
        if (currentUser?.user?._id == aut._id) {
            return true;
        } else {
            return false;
        }
    });

    return (
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md ">
            {authorFound && myPosts && (
                <>
                    <Link to={`/profile/editpost/${post._id}`}>
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(post._id)}
                        className=" ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </>
            )}
            <div className="flex justify-between items-center mb-5 text-gray-500 mt-2">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
                    <i
                        className="fa fa-caret-right mr-2"
                        aria-hidden="true"
                    ></i>
                    <Link
                        to={`/category/${post.category.slug}`}
                        className="hover:underline"
                    >
                        {post.category.name}
                    </Link>
                </span>
                <span className="text-sm">
                    {Moment(post.createdAt).format('DD-MM-YYYY')}
                </span>
            </div>
            <img className="w-full max-h-[52rem] " src={post.img} />
            <h2 className="mb-2 mt-4 text-2xl font-bold tracking-tight text-gray-900">
                <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="mb-5 font-light text-gray-500 ">
                <div
                    className="prose"
                    dangerouslySetInnerHTML={sanitizedData()}
                ></div>
            </p>
            <div className="flex justify-between items-center">
                {post.author?.length &&
                    post.author.map((author, index) => (
                        <div
                            className="flex items-center space-x-4"
                            key={index}
                        >
                            <div className="w-6 h-6 mx-auto bg-blue-500 rounded-full"></div>
                            <span className="font-medium">
                                {author.name} {author.surname}
                            </span>
                        </div>
                    ))}
                <Link
                    to={`/post/${post._id}`}
                    className="inline-flex items-center font-medium text-primary-600 hover:underline"
                >
                    Read More
                </Link>
            </div>
        </article>
    );
};

export default Post;
