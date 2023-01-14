import React from 'react';
import Navbar from './components/Navbar';
import AboutMe from './components/AboutMe';
import Chat from './components/Chat/Chat';
import PopularPosts from './components/PopularPosts';
import PageRoutes from './PageRoutes';
import { useLocation, matchPath } from 'react-router-dom';
import AdminNav from './components/Admin/AdminNav';

function App() {
    const { pathname } = useLocation();

    const noSide = matchPath('/profile/*', pathname);
    const admin = matchPath('/admin/*', pathname);
    return (
        <div>
            <div>
                {admin ? <AdminNav /> : <Navbar />}
                <div>
                    <section className="bg-white ">
                        <div className="lg:flex">
                            <PageRoutes />
                            {pathname != '/auth' && !admin && !noSide && (
                                <div className="lg:flex-none xl:w-1/5 lg:w-1/4">
                                    <AboutMe />
                                    <Chat />
                                    <PopularPosts />
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default App;
