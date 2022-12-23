import React, { useState, useEffect } from 'react';
import Author from './Author';
import Article from './Article';
import Comments from './Comments';
import Rating from './Rating';
import axios from 'axios';
import Moment from 'moment';
import { useParams } from 'react-router-dom';

const Post = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getPost = async () => {
            await axios
                .get('http://localhost:3000/api/posts/' + id)
                .then((response) => {
                    const postDetail = response.data.Post;
                    setPost(postDetail);
                })
                .catch((error) => console.log(error));
        };
        getPost();
    }, []);
    return (
        <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-4">
            <main className="pt-8 pb-16 lg:pb-24 bg-white">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
                        <div className="relative mb-4 lg:mb-6 not-format">
                            <p className="text-base font-light text-gray-500 absolute top-0 right-0">
                                {Moment(post.published_at).format('DD-MM-YYYY')}
                            </p>
                            <div className="flex flex-wrap items-center mb-6 not-italic">
                                <Author author={post.author} />
                            </div>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                                {post.title}
                            </h1>
                        </div>

                        <img
                            src={post.img}
                            className="w-full max-h-[32rem] mb-6"
                        />
                        <Article body={post.body} />
                        <Rating />
                        <Comments comments={post.comments} id={post._id} />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default Post;
