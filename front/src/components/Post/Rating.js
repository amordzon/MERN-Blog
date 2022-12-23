import React from 'react';

const Rating = () => {
    return (
        <ul className="flex justify-center my-8">
            <li>
                <i className="fa-regular fa-face-frown cursor-pointer mx-1 text-4xl text-red-600 hover:text-red-800"></i>
                <p className="text-center">1</p>
            </li>
            <li>
                <i className="fa-regular fa-face-meh cursor-pointer mx-1 text-4xl text-blue-600 hover:text-blue-800"></i>
                <p className="text-center">8</p>
            </li>
            <li>
                <i className="fa-regular fa-face-smile cursor-pointer mx-1 text-4xl text-green-600 hover:text-green-800"></i>
                <p className="text-center">9</p>
            </li>
        </ul>
    );
};

export default Rating;
