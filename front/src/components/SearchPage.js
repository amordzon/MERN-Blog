import React, { useState, useEffect } from 'react';
import Summary from './Summary';
import Posts from './Posts/Posts';
import { useSelector } from 'react-redux';

const SearchPage = () => {
    const { posts: blogPosts, searchedText } = useSelector(
        (state) => state.article
    );
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const filtPosts = blogPosts.filter((post) => {
            return (
                post.title.toLowerCase().indexOf(searchedText.toLowerCase()) >=
                    0 ||
                post.body.toLowerCase().indexOf(searchedText.toLowerCase()) >=
                    0 ||
                post.category.name
                    .toLowerCase()
                    .indexOf(searchedText.toLowerCase()) >= 0 ||
                post.author.some((au) => {
                    return (
                        (
                            au.name.toLowerCase() +
                            ' ' +
                            au.surname.toLowerCase()
                        ).indexOf(searchedText.toLowerCase()) >= 0
                    );
                })
            );
        });
        setFilteredPosts(filtPosts);
    }, [searchedText]);

    return (
        <div className="lg:flex-none xl:w-4/5 lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
            <Summary
                header={'Searching: ' + searchedText}
                description={'Search by title, content, category or author.'}
            />
            <Posts posts={filteredPosts} />
        </div>
    );
};

export default SearchPage;
