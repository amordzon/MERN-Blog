import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
const Post = ({ post }) => {
    const truncate = (str) => {
        return str.length > 200 ? str.slice(0, 198) + '...' : str;
    };
    return (
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md ">
            <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
                    <i
                        className="fa fa-caret-right mr-2"
                        aria-hidden="true"
                    ></i>
                    <a href="#" className="hover:underline">
                        {post.category.name}
                    </a>
                </span>
                <span className="text-sm">
                    {Moment(post.published_at).format('DD-MM-YYYY')}
                </span>
            </div>

            <img className="w-full max-h-[32rem] " src={post.img} />

            <h2 className="mb-2 mt-4 text-2xl font-bold tracking-tight text-gray-900">
                <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="mb-5 font-light text-gray-500 ">
                {truncate(post.body)}
            </p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 mx-auto bg-blue-500 rounded-full"></div>
                    <span className="font-medium">
                        {post.author.name} {post.author.surname}
                    </span>
                </div>
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
