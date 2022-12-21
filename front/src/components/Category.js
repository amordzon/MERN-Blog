import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Summary from './Summary';
import AboutMe from './AboutMe';
import Chat from './Chat';
import PopularPosts from './PopularPosts';
import axios from 'axios';
import Posts from './Posts';
import { useNavigate, useParams } from 'react-router-dom';

const Category = () => {
    const [categoryDetails, setCategoryDetails] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();
    const getPostsCategory = async () => {
        await axios
            .get('http://localhost:3000/api/category/' + slug)
            .then((response) => {
                const category = response.data.Category;

                if (category === null) navigate('/');
                setCategoryDetails(category);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getPostsCategory();
    }, [slug]);
    return (
        <div>
            <Navbar />
            <div>
                <section className="bg-white ">
                    <div className="lg:flex">
                        <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
                            {categoryDetails && (
                                <>
                                    <Summary
                                        header={categoryDetails.name}
                                        description={
                                            categoryDetails.description
                                        }
                                    />
                                    <Posts posts={categoryDetails.posts} />
                                </>
                            )}
                        </div>
                        <div className="lg:flex-none xl:w-1/5 lg:w-1/4">
                            <AboutMe />
                            <Chat />
                            <PopularPosts />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Category;
