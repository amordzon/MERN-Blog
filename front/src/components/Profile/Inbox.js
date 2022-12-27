import React from 'react';

const Inbox = () => {
    return (
        <>
            <section className="flex flex-col pt-3 xl:w-1/5 lg:w-1/4  bg-gray-50 h-full overflow-y-scroll">
                <label className="py-3 text-center font-bold text-xl border-b">
                    <div>New messages</div>
                </label>

                <ul className="mt-6">
                    <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
                        <a
                            href="#"
                            className="flex justify-between items-center"
                        >
                            <h3 className="text-lg font-semibold">
                                Akhil Gautam
                            </h3>
                            <p className="text-md text-gray-400">23m ago</p>
                        </a>
                        <div className="text-md italic text-gray-400">
                            You have been invited!
                        </div>
                    </li>
                    <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
                        <a
                            href="#"
                            className="flex justify-between items-center"
                        >
                            <h3 className="text-lg font-semibold">
                                Akhil Gautam
                            </h3>
                            <p className="text-md text-gray-400">23m ago</p>
                        </a>
                        <div className="text-md italic text-gray-400">
                            You have been invited!
                        </div>
                    </li>
                    <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
                        <a
                            href="#"
                            className="flex justify-between items-center"
                        >
                            <h3 className="text-lg font-semibold">
                                Akhil Gautam
                            </h3>
                            <p className="text-md text-gray-400">23m ago</p>
                        </a>
                        <div className="text-md italic text-gray-400">
                            You have been invited!
                        </div>
                    </li>
                    <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
                        <a
                            href="#"
                            className="flex justify-between items-center"
                        >
                            <h3 className="text-lg font-semibold">
                                Akhil Gautam
                            </h3>
                            <p className="text-md text-gray-400">23m ago</p>
                        </a>
                        <div className="text-md italic text-gray-400">
                            You have been invited!
                        </div>
                    </li>
                    <li className="py-5 border-b px-3 bg-indigo-600 text-white">
                        <a
                            href="#"
                            className="flex justify-between items-center"
                        >
                            <h3 className="text-lg font-semibold">
                                Akhil Gautam
                            </h3>
                            <p className="text-md">23m ago</p>
                        </a>
                        <div className="text-md">You have been invited!</div>
                    </li>
                    <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
                        <a
                            href="#"
                            className="flex justify-between items-center"
                        >
                            <h3 className="text-lg font-semibold">
                                Akhil Gautam
                            </h3>
                            <p className="text-md text-gray-400">23m ago</p>
                        </a>
                        <div className="text-md italic text-gray-400">
                            You have been invited!
                        </div>
                    </li>
                    <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
                        <a
                            href="#"
                            className="flex justify-between items-center"
                        >
                            <h3 className="text-lg font-semibold">
                                Akhil Gautam
                            </h3>
                            <p className="text-md text-gray-400">23m ago</p>
                        </a>
                        <div className="text-md italic text-gray-400">
                            You have been invited!
                        </div>
                    </li>
                </ul>
            </section>
            <section className="xl:w-3/5 lg:w-1/2  px-4 flex flex-col bg-white rounded-r-3xl">
                <div className="flex justify-between items-center h-36 border-b-2 mb-4">
                    <div className="flex space-x-4 items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img
                                src="https://bit.ly/2KfKgdy"
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-lg">
                                Akhil Gautam
                            </h3>
                            <p className="text-light text-gray-400">
                                akhil.gautam123@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
                <section>
                    <h1 className="font-bold text-2xl">
                        We need UI/UX designer
                    </h1>
                    <article className="mt-8 text-gray-500 leading-7 tracking-wider">
                        <p>Hi Akhil,</p>
                        <p>
                            Design and develop enterprise-facing UI and
                            consumer-facing UI as well as REST API backends.Work
                            with Product Managers and User Experience designers
                            to create an appealing user experience for desktop
                            web and mobile web.
                        </p>
                        <footer className="mt-12">
                            <p>Thanks & Regards,</p>
                            <p>Alexandar</p>
                        </footer>
                    </article>
                </section>
                <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
                    <textarea
                        className="w-full bg-gray-50 p-2 rounded-xl"
                        placeholder="Type your reply here..."
                        rows="3"
                    ></textarea>
                    <div className="flex items-center justify-between p-2">
                        <button className="h-6 w-6 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            ></svg>
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl">
                            Reply
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Inbox;
