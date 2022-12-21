import React, { useState, useEffect } from 'react';
import Summary from './Summary';
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
        <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
            {categoryDetails && (
                <>
                    <Summary
                        header={categoryDetails.name}
                        description={categoryDetails.description}
                    />
                    <Posts posts={categoryDetails.posts} />
                </>
            )}
        </div>
    );
};

export default Category;
