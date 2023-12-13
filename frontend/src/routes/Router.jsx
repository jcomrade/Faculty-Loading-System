import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
const RouterComponent = () => {
    return (
        <Routes>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
        </Routes>
    );
};

export default RouterComponent;