import React, { useRef, useEffect } from 'react';

const Messages = ({ messages }) => {
    const elementRef = useRef();
    useEffect(() =>
        elementRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        })
    );
    return (
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.length > 0 ? (
                messages.map((message, i) =>
                    message.ownedByCurrentUser ? (
                        <div
                            className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end  text-right"
                            key={i}
                        >
                            <div>
                                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg break-all text-left">
                                    <p className="text-sm">{message.body}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none ">
                                    {message.time}
                                </span>
                            </div>
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                    ) : (
                        <div
                            className="flex w-full mt-2 space-x-3 max-w-xs text-left"
                            key={i}
                        >
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                            <div>
                                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                    <div className="text-xs text-gray-500 leading-none">
                                        {message.name}
                                    </div>
                                    <p className="text-sm break-all">
                                        {message.body}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none text-right">
                                    {message.time}
                                </span>
                            </div>
                        </div>
                    )
                )
            ) : (
                <div className="w-full text-center rounded-full bg-blue-300">
                    Say hello to everyone!
                </div>
            )}

            <div ref={elementRef} />
        </div>
    );
};

export default Messages;
