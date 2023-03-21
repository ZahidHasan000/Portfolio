import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import About from './Components/About/About';
import Projects from './Components/Projects/Projects';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loadUser } from './actions/user';
import AdminPanel from './Components/Admin/AdminPanel';
import Timeline from './Components/Admin/Timeline';
import Youtube from './Components/Admin/Youtube';
import Project from './Components/Admin/Project';
import Loader from './Components/Loader/Loader';

function App() {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.login);
    const { loading } = useSelector((state) => state.user);
    // const { loading, user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUser());
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Router>
            {/* {loading ? (<div>loading</div>) : ( */}
            {loading ? (<Loader />) : (
                <>
                    <Header />
                    <Routes>
                         {/* <Route path='/' element={<Home youtubes={user.youtube} timelines={user.timeline} skills={user.skills} />} /> */}
                        <Route path='/' element={<Home />} />
                       
                        <Route path='/about' element={<About />} />
                        {/* <Route path='/about' element={<About about={user.about} />} /> */}

                        <Route path='/projects' element={<Projects />} />
                        {/* <Route path='/projects' element={<Projects Projects={user.Projects} />} /> */}

                        <Route path='/contact' element={<Contact />} />

                        {/* <Route path='/account' element={<Login />} /> */}
                        <Route
                            path="/account"
                            element={isAuthenticated ? <AdminPanel /> : <Login />}
                        />

                        <Route
                            path="/admin/timeline"
                            element={isAuthenticated ? <Timeline /> : <Login />}
                        />

                        <Route
                            path="/admin/youtube"
                            element={isAuthenticated ? <Youtube /> : <Login />}
                        />

                        <Route
                            path="/admin/project"
                            element={isAuthenticated ? <Project /> : <Login />}
                        />
                    </Routes>

                    <Footer />
                </>
            )}

        </Router>
    )
}

export default App;