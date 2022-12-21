import React from 'react';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import Category from './components/Category';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:slug" element={<Category />} />
            </Routes>
        </div>
    );
}

export default App;
