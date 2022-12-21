import React, { useState, useEffect } from 'react';
import Summary from './Summary';
import Posts from './Posts';
import axios from 'axios';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            await axios
                .get('http://localhost:3000/api/posts')
                .then((response) => {
                    const allPosts = response.data.Posts;
                    setPosts(allPosts);
                })
                .catch((error) => console.log(error));
        };
        getAllPosts();
    }, []);
    return (
        <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
            <Summary
                header={'Our Blog'}
                description={
                    'You will find here posts about everything. Sing up and create a new post today!'
                }
            />
            <Posts posts={posts} />
        </div>
    );
};

export default HomePage;
