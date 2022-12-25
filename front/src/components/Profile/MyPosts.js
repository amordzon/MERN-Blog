import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import Summary from '../Summary';
import axios from 'axios';
import authHeader from '../../services/auth-header';

const MyPosts = () => {
    const [myPosts, setMyPosts] = useState([]);
    const getMyPosts = async () => {
        await axios
            .get('http://localhost:3000/api/posts/myposts', {
                headers: authHeader(),
            })
            .then((response) => {
                const posts = response.data.Posts;
                setMyPosts(posts);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getMyPosts();
    }, []);
    return (
        <>
            <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
                <Summary
                    header={'My posts'}
                    description={'Manage your posts here.'}
                />
                <Posts posts={myPosts} />
            </div>
        </>
    );
};

export default MyPosts;
