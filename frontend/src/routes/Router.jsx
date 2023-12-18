import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import Help from '../pages/Help.jsx'
const RouterComponent = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/help" element={<Help />} />
        </Routes>
    );
};

export default RouterComponent;