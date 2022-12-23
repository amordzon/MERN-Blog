import React from 'react';

const Author = ({ author = {} }) => {
    return (
        <div className="inline-flex items-center mr-3 text-sm text-gray-900 mt-2">
            <div className="w-12 h-12 mr-4 mx-auto bg-blue-500 rounded-full"></div>

            <div>
                <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 mr-5"
                >
                    {author.name} {author.surname}
                </a>
            </div>
        </div>
    );
};

export default Author;
