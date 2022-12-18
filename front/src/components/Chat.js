import React from 'react';

const Chat = () => {
    return (
        <div className="mt-12 flex flex-col items-center justify-center w-full min-h-[32rem] lg:min-h-[24rem] xl:min-h-[28rem] bg-gray-100 text-gray-800 ">
            <h1 className="font-semibold text-gray-800 ">CZAT ONLINE</h1>
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod.
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet.
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.{' '}
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.{' '}
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt.
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet.
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <div className="text-xs text-gray-500 leading-none">
                                    Jarek
                                </div>
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.{' '}
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit.
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                2 min ago
                            </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                </div>

                <div className="bg-gray-300 p-4">
                    <input
                        className="flex items-center h-10 w-full rounded px-3 text-sm"
                        type="text"
                        placeholder="Type your message…"
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat;
