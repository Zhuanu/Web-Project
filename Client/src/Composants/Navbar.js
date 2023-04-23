import React from 'react';
// import axios from 'axios';
import Logout from './Log/Logout';
import GetUser from './Profil/GetUser';

const Navbar = () => {

    // axios({
    //     method: "GET",
    //     url: "http://localhost:8000/cookie",
    //     withCredentials: true,
    // })
    // .then(res => {
    //     console.log(res.data.id)
    // })
    // .catch(err => {
    //     console.log(err);
    // })

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <GetUser />
                <Logout />
            </div>
        </nav>
    );
}

export default Navbar;