import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PopularPosts = () => {
    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        const getPopularPosts = async () => {
            await axios
                .get('http://localhost:3000/api/posts?sortBy=score&order=-1')
                .then((response) => {
                    const popPosts = response.data.Posts;
                    setPopularPosts(popPosts.slice(0, 5));
                })
                .catch((error) => console.log(error));
        };
        getPopularPosts();
    }, []);
    return (
        <div className="mt-12 mx-4 ">
            <h3 className="font-bold text-gray-900">NAJPOPULARNIEJSZE WPISY</h3>
            <div className="mt-2">
                <ul>
                    {popularPosts.length > 0 &&
                        popularPosts.map((post, index) => (
                            <li className="list-disc" key={index}>
                                <a href="" className="hover:underline">
                                    {post.title}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default PopularPosts;
