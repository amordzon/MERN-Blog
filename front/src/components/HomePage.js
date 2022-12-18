import React from 'react';
import Chat from './Chat';
import AboutMe from './AboutMe';
import Summary from './Summary';
import Posts from './Posts';
import PopularPosts from './PopularPosts';

const HomePage = () => {
    return (
        <div>
            <section className="bg-white ">
                <div className="lg:flex">
                    <div className="lg:flex-none lg:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">
                        <Summary />
                        <Posts />
                    </div>
                    <div className="lg:flex-none lg:w-1/4">
                        <AboutMe />
                        <Chat />
                        <PopularPosts />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
