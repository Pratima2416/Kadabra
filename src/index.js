import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './index.css';

import Login from './login/login';
import Register from './login/register';
import ForgotPassword from './login/ForgotPassword'; 
import TravelGateways from './login/TravelGateways';
import VerifyCode from './login/verifycode'; 

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/travel-gateways" element={<TravelGateways />} />
            <Route path="/verifycode" element={<VerifyCode />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
