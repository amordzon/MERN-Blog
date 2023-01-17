import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import Summary from '../Summary';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import Swal from 'sweetalert2';

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
            });
    };
    useEffect(() => {
        getMyPosts();
    }, []);
    const deletePost = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete post!',
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios
                    .delete('http://localhost:3000/api/posts/' + id, {
                        headers: authHeader(),
                    })
                    .then(() => {
                        const newPosts = myPosts.filter(
                            (post) => post._id != id
                        );
                        setMyPosts(newPosts);
                        Swal.fire(
                            'Deleted!',
                            'Your post has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                        });
                    });
            }
        });
    };
    return (
        <>
            <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
                <Summary
                    header={'My posts'}
                    description={'Manage your posts here.'}
                />
                <Posts posts={myPosts} myPosts={true} deletePost={deletePost} />
            </div>
        </>
    );
};

export default MyPosts;
