import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <ScrollToTop />
        <App />
    </Router>,
    document.getElementById('root')
);
