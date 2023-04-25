import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../../Pages/Home";
import Trending from "../../Pages/Trending";
import Profil from "../../Pages/Profil";
import Navbar from "../Navbar";

import '../../App.css'

const index = () => {
    return (
        <div className='grid-container'>
            <Navbar />
            <div className="main-content">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/trending" element={<Trending/>} />
                        <Route path="/profil" element={<Profil/>} />
                        <Route path="*" element={<Navigate to="/profil" />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
};

export default index;