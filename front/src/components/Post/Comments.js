import React from 'react';
import Comment from './Comment';

const Comments = ({ comments = [] }) => {
    return (
        <div className="not-format">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                    Discussion ({comments.length})
                </h2>
            </div>
            <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <label className="sr-only">Your comment</label>
                    <textarea
                        id="comment"
                        rows="6"
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0"
                        placeholder="Write a comment..."
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="inline-flex bg-blue-700 text-white items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                >
                    Post comment
                </button>
            </form>
            {comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
            ))}
        </div>
    );
};

export default Comments;
