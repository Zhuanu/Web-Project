import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../../Pages/Home";
// import ProfilFriend from "../../Pages/ProfilFriend";
import Profil from "../../Pages/Profil";
import Navbar from "../Navbar";
import { UserContext } from "../AppContext";

const Routers = () => {
    const { profil } = useContext(UserContext);

    return (
        <div className=''>
            <Navbar />
            <div className="main-content">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/profil" element={<Profil/>} />
                        <Route path={`/profil/${profil}`} element={<Profil/>} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
};

export default Routers;