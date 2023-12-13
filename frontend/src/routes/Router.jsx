import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
const RouterComponent = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    );
};

export default RouterComponent;