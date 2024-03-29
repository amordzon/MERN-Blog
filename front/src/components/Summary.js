import React from 'react';

const Summary = ({ header, description }) => {
    return (
        <div className="mx-auto max-w-screen-sm lg:px-6 px-2 text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                {header}
            </h2>
            <p className="font-light text-gray-500 sm:text-xl ">
                {description}
            </p>
        </div>
    );
};

export default Summary;
