import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Logout from './Log/Logout';

const Navbar = () => {

    axios({
        method: "GET",
        url: "http://localhost:8000/cookie",
        withCredentials: true,
    })
    .then(res => {
        console.log(res.data.id)
    })
    .catch(err => {
        console.log(err);
    })

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                {/* <p>{document.cookie}</p> */}
                <Logout />
            </div>
        </nav>
    );
}

export default Navbar;