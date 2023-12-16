import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import Semester from '../pages/Semester.jsx';
const RouterComponent = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/semester/:id/:path" element={<Semester/>} />
        </Routes>
    );
};

export default RouterComponent;