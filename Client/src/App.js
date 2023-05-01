import './App.css';
import { UserContext } from './Composants/AppContext';
import Routes from "./Composants/Routers/Routers";
import { useState, useEffect } from 'react';
import axios from 'axios';

require('bootstrap/dist/css/bootstrap.min.css')

function App() {
    const [userid, setUserid] = useState(null);
    const [profil, setProfil] = useState(null);
    const [user, setUser] = useState(null);
    const [listFollowing, setlistFollowing] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("userid");
        if (storedUser) {
            setUserid(JSON.parse(storedUser));
            setProfil(JSON.parse(storedUser));
        }

        axios({
            method: "GET",
            url: "http://localhost:8000/api/user/get",
            withCredentials: true,
        })
        .then((res) => {
            setUser(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

        axios ({
            method: 'GET',
            url: 'http://localhost:8000/api/friend/following',
            withCredentials: true,
        })
        .then((res) => {
            setlistFollowing(res.data.following)
        })
        .catch ((err) => {
            console.log(err)
        })

    }, []);

    const handleLogin = (userid) => {
        localStorage.setItem("userid", JSON.stringify(userid));
        setUserid(userid);
        setProfil(userid);
    };

    const handleLogout = () => {
        localStorage.removeItem("userid");
        setUserid(null);
        setProfil(null);
    };
    
    return (
        <UserContext.Provider value={{handleLogin, handleLogout, userid, 
                                        listFollowing, setlistFollowing,
                                        profil, setProfil, 
                                        user, setUser}}>
            <Routes />
        </UserContext.Provider>
    );
}

export default App;