import React from 'react';

const Rating = ({ rating, ratePost }) => {
    return (
        <ul className="flex justify-center my-8">
            <li>
                <button onClick={() => ratePost(-1)}>
                    {' '}
                    <i className="fa-regular fa-face-frown cursor-pointer mx-1 text-4xl text-red-600 hover:text-red-800"></i>
                </button>
                <p className="text-center">{rating[-1] ? rating[-1] : 0}</p>
            </li>
            <li>
                <button onClick={() => ratePost(0)}>
                    {' '}
                    <i className="fa-regular fa-face-meh cursor-pointer mx-1 text-4xl text-blue-600 hover:text-blue-800"></i>
                </button>
                <p className="text-center">{rating[0] ? rating[0] : 0}</p>
            </li>
            <li>
                <button onClick={() => ratePost(1)}>
                    {' '}
                    <i className="fa-regular fa-face-smile cursor-pointer mx-1 text-4xl text-green-600 hover:text-green-800"></i>
                </button>
                <p className="text-center">{rating[1] ? rating[1] : 0}</p>
            </li>
        </ul>
    );
};

export default Rating;
