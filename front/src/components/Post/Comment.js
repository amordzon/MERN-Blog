import React, { useState } from 'react';
import Moment from 'moment';

const Comment = ({ comment = {}, user, removeComment, editComm }) => {
    const [menuShow, setMenuShow] = useState(false);
    return (
        <article className=" relative p-6 mb-6 text-base bg-white rounded-lg border-b-2">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                        <div className="w-5 h-5 mr-2 mx-auto bg-blue-500 rounded-full"></div>
                        {comment.user?.name} {comment.user?.surname}
                    </p>
                    <p className="text-sm text-gray-600">
                        {Moment(comment.createdAt).format('DD-MM-YYYY')}
                    </p>
                </div>
                {(user?._id == comment.user?._id || user?.role == 'admin') && (
                    <>
                        <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                            type="button"
                            onClick={() => setMenuShow(!menuShow)}
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            </svg>
                            <span className="sr-only">Comment settings</span>
                        </button>
                        <div
                            id="dropdownComment1"
                            className={
                                'absolute right-0 top-16 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow' +
                                (!menuShow && ' hidden')
                            }
                        >
                            <ul className="py-1 text-sm text-gray-700 shadow">
                                {user?._id == comment.user?._id && (
                                    <li>
                                        <a
                                            onClick={() => editComm(comment)}
                                            className="block py-2 px-4 hover:bg-gray-100"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <a
                                        onClick={() =>
                                            removeComment(comment._id)
                                        }
                                        className="block py-2 px-4 hover:bg-gray-100"
                                    >
                                        <button>Remove</button>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </footer>
            <p>{comment.body}</p>
        </article>
    );
};

export default Comment;
