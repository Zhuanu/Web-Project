import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../../Pages/Home";
import Trending from "../../Pages/Trending";
import Profil from "../../Pages/Profil";
import Navbar from "../Navbar";

const index = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/trending" element={<Trending/>} />
                <Route path="/profil" element={<Profil/>} />
                <Route path="*" element={<Navigate to="/profil" />} />
            </Routes>
        </Router>
    );
};

export default index;

// Client/src/Pages/Home.js
// Client/src/Composants/Routers/index.js