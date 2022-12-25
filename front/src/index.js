import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Router>
            <ScrollToTop />
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
