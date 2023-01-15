import React, { useEffect } from 'react';
import Summary from './Summary';
import Posts from './Posts/Posts';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogPosts } from '../slices/articleSlice';

const HomePage = () => {
    const { posts: blogPosts } = useSelector((state) => state.article);
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllPosts = async () => {
            await axios
                .get(
                    'http://localhost:3000/api/posts?sortBy=createdAt&order=-1'
                )
                .then((response) => {
                    const allPosts = response.data.Posts;
                    dispatch(setBlogPosts(allPosts));
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
            <Posts posts={blogPosts} />
        </div>
    );
};

export default HomePage;
