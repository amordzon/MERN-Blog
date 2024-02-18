import React from 'react';

const Rating = ({ rating, ratePost, currentRating }) => {
    return (
        <ul className="flex justify-center my-8">
            <li>
                <button onClick={() => ratePost(-1)}>
                    {' '}
                    <i
                        className={
                            (currentRating === -1
                                ? 'text-red-800'
                                : 'text-red-600') +
                            ' fa-regular fa-face-frown cursor-pointer mx-1 text-4xl hover:text-red-800'
                        }
                    ></i>
                </button>
                <p className="text-center">{rating[-1] ? rating[-1] : 0}</p>
            </li>
            <li>
                <button onClick={() => ratePost(0)}>
                    {' '}
                    <i
                        className={
                            (currentRating === 0
                                ? 'text-blue-800'
                                : 'text-blue-600') +
                            ' fa-regular fa-face-meh cursor-pointer mx-1 text-4xl hover:text-blue-800'
                        }
                    ></i>
                </button>
                <p className="text-center">{rating[0] ? rating[0] : 0}</p>
            </li>
            <li>
                <button onClick={() => ratePost(1)}>
                    {' '}
                    <i
                        className={
                            (currentRating === 1
                                ? 'text-green-800'
                                : 'text-green-600') +
                            ' fa-regular fa-face-smile cursor-pointer mx-1 text-4xl hover:text-green-800'
                        }
                    ></i>
                </button>
                <p className="text-center">{rating[1] ? rating[1] : 0}</p>
            </li>
        </ul>
    );
};

export default Rating;
