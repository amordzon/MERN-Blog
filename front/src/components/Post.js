import React from 'react';

const Post = () => {
    return (
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md ">
            <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
                    Tutorial
                </span>
                <span className="text-sm">14 days ago</span>
            </div>

            <img
                className="w-full max-h-[32rem] "
                src="https://3.bp.blogspot.com/-ob4YAaH7mmk/WraDM_ZB2zI/AAAAAAAAPZI/wrGQe-FwY4MUzegsP266ewYIPYPWLCbtACLcBGAs/s1600/Formation%2Bof%2BMinerals.jpg"
            />

            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                <a href="#">How to quickly deploy a static website</a>
            </h2>
            <p className="mb-5 font-light text-gray-500 ">
                Static websites are now used to bootstrap lots of websites and
                are becoming the basis for a variety of tools that even
                influence both web designers and developers influence both web
                designers and developers.
            </p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        className="w-7 h-7 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                        alt="Jese Leos avatar"
                    />
                    <span className="font-medium">Jese Leos</span>
                </div>
                <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary-600 hover:underline"
                >
                    Read more
                </a>
            </div>
        </article>
    );
};

export default Post;
