import React from 'react';
import Post from './Post';

const Posts = ({ posts = [] }) => {
    return (
        <div className="grid gap-8 lg:px-6 px-2">
            {posts.length > 0 ? (
                posts.map((post, index) => <Post key={index} post={post} />)
            ) : (
                <div>There is no posts!</div>
            )}
        </div>
    );
};

export default Posts;
