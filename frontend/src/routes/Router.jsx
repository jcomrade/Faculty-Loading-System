import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import Export from '../pages/Export.jsx';
import Semester from '../pages/Semester.jsx';
import Faculty from '../pages/Faculty.jsx';
const RouterComponent = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/export" element={<Export />} />
            <Route path="/semester/:id/:path" element={<Semester/>} />
            <Route path="/faculty" element={<Faculty/>} />
        </Routes>
    );
};

export default RouterComponent;