import React from 'react';
import Post from './Post';

const Posts = () => {
    return (
        <div className="grid gap-8 lg:px-6 px-2">
            <Post />
            <Post />
            <Post />
        </div>
    );
};

export default Posts;
