import React from 'react';
import Post from './components/Post/Post';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import Category from './components/Category';
import Others from './components/Others';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import MyPosts from './components/Profile/MyPosts';
import Aside from './components/Profile/Aside';
import NewEditPost from './components/Profile/NewEditPost';
import SearchPage from './components/SearchPage';
import AdminSide from './components/Admin/AdminSide';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminPosts from './components/Admin/Posts/AdminPosts';

const PageRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="admin" element={<AdminSide />}>
                    <Route path="login" element={<AdminLogin />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="posts" element={<AdminPosts />} />
                    <Route
                        path="newpost"
                        element={<NewEditPost admin={true} />}
                    />
                    <Route
                        path="editpost/:id"
                        element={<NewEditPost admin={true} />}
                    />
                </Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/others" element={<Others />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="profile" element={<Aside />}>
                    <Route path="user" element={<Profile />} />
                    <Route path="myposts" element={<MyPosts />} />
                    <Route path="newpost" element={<NewEditPost />} />
                    <Route path="editpost/:id" element={<NewEditPost />} />
                </Route>
            </Routes>
        </>
    );
};

export default PageRoutes;
