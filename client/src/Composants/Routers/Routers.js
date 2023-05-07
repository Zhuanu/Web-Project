import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import Home from "../../Pages/Home";
import Profil from "../../Pages/Profil";
import Navbar from "../Navbar";
import { UserContext } from "../AppContext";

const Routers = () => {
    const { profil, userid } = useContext(UserContext);

    return (
        <div className=''>
            <Router>
                {userid ? <Navbar /> : null}
                <div className="main-content text-white" style={{height: "100vh", maxHeight: "100vh"}}>
                    <Routes>

                        <Route path="/" element={<Home/>} />
                        <Route path="/profil" element={<Profil/>} />
                        <Route path={`/profil/${profil}`} element={<Profil/>} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default Routers;