import React, { useState, useEffect } from 'react';
import Author from './Author';
import Article from './Article';
import Comments from './Comments';
import Rating from './Rating';
import axios from 'axios';
import Moment from 'moment';
import { useParams } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Post = () => {
    const [post, setPost] = useState({});
    const [rating, setRating] = useState([]);
    const { id } = useParams();
    const [currentRating, setCurrentRating] = useState('');
    const { user: currentUser } = useSelector(
        (state) => state.persistedReducer.auth
    );
    const reducerat = (rating) => {
        const ratingResult = rating.reduce((acc, curr) => {
            return { ...acc, [curr._id]: curr.count };
        }, {});
        return ratingResult;
    };
    useEffect(() => {
        const getPost = async () => {
            await axios
                .get(`${process.env.REACT_APP_API}/api/posts/${id}`)
                .then((response) => {
                    const postDetail = response.data.Post;
                    setPost(postDetail);
                    const ratUser = response.data.Post.ratings.filter(
                        (rating) => {
                            return rating.ratedBy == currentUser.user._id;
                        }
                    );
                    setCurrentRating(ratUser[0]?.score);
                    const ratingResult = reducerat(response.data.Rating);
                    setRating(ratingResult);
                });
        };
        getPost();
    }, [id]);

    const ratePost = async (score) => {
        axios
            .post(
                `${process.env.REACT_APP_API}/api/posts/rating`,
                {
                    id: post._id,
                    score: score,
                },
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                setCurrentRating(score);
                const rating = reducerat(response.data.Rating);
                setRating(rating);
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have to be logged in!',
                });
            });
    };
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
                                {post.author?.length &&
                                    post.author.map((author, index) => (
                                        <Author author={author} key={index} />
                                    ))}
                            </div>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                                {post.title}
                            </h1>
                        </div>

                        <img
                            src={post.img?.imageUrl}
                            className="w-full max-h-[32rem] mb-6"
                        />
                        <Article body={post.body} />
                        <Rating
                            rating={rating}
                            ratePost={ratePost}
                            currentRating={currentRating}
                        />
                        <Comments comments={post.comments} id={post._id} />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default Post;
