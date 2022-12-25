import React from 'react';
import Post from './components/Post/Post';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import Category from './components/Category';
import Others from './components/Others';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';

const PageRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/others" element={<Others />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    );
};

export default PageRoutes;
