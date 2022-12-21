import React from 'react';
import Navbar from './components/Navbar';
import AboutMe from './components/AboutMe';
import Chat from './components/Chat';
import PopularPosts from './components/PopularPosts';
import PageRoutes from './PageRoutes';

function App() {
    return (
        <div>
            <div>
                <Navbar />
                <div>
                    <section className="bg-white ">
                        <div className="lg:flex">
                            <PageRoutes />
                            <div className="lg:flex-none xl:w-1/5 lg:w-1/4">
                                <AboutMe />
                                <Chat />
                                <PopularPosts />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default App;
