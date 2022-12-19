import React from 'react';
import Post from './Post';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            await axios
                .get('http://localhost:3000/api/posts')
                .then((response) => {
                    const allPosts = response.data.Posts;
                    setPosts(allPosts);
                    console.log(allPosts);
                })
                .catch((error) => console.log(error));
        };
        getAllPosts();
    }, []);

    return (
        <div className="grid gap-8 lg:px-6 px-2">
            {posts.length > 0 ? (
                posts.map((post, index) => <Post key={index} post={post} />)
            ) : (
                <div>Nie ma postow!</div>
            )}
        </div>
    );
};

export default Posts;
