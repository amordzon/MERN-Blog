import React from 'react';
import Post from './Post';

const Posts = ({ posts = [], myPosts = false, deletePost }) => {
    return (
        <div className="grid gap-8 lg:px-6 px-2">
            {posts.length > 0 ? (
                posts.map(
                    (post, index) =>
                        (post.approved || myPosts) && (
                            <Post
                                key={index}
                                post={post}
                                myPosts={myPosts}
                                handleDelete={deletePost}
                            />
                        )
                )
            ) : (
                <>
                    <div>There is no posts!</div>
                </>
            )}
        </div>
    );
};

export default Posts;
