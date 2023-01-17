import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Summary from './Summary';
import { Link } from 'react-router-dom';

const Others = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            await axios
                .get('http://localhost:3000/api/category')
                .then((response) => {
                    const allCategories = response.data.Categories;
                    setCategories(allCategories);
                });
        };
        getAllPosts();
    }, []);
    return (
        <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
            <Summary
                header={'All categories'}
                description={'You can pick here a post category.'}
            />
            <div className="text-center">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <Link to={`/category/${category.slug}`} key={index}>
                            <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-5 py-2 bg-blue-200 text-blue-700 hover:text-gray-200 hover:bg-blue-600 rounded-full mr-2 mt-2">
                                {category.name}
                            </div>
                        </Link>
                    ))
                ) : (
                    <h1>There is no categories!</h1>
                )}
            </div>
        </div>
    );
};

export default Others;
