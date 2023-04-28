import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../../Pages/Home";
import ProfilFriend from "../../Pages/ProfilFriend";
import Profil from "../../Pages/Profil";
import Navbar from "../Navbar";
import { UserContext } from "../AppContext";

const Routers = () => {
    const { userid, profil } = useContext(UserContext);
    return (
        <div className='grid-container'>
            <Navbar />
            <div className="main-content">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        {userid === profil ? <Route path="/profil" element={<Profil/>} /> : <Route path="/profil/:id" element={<ProfilFriend/>} />}
                        <Route path="*" element={<Navigate to="/profil" />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
};

export default Routers;