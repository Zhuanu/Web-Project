import './App.css';
import { UserContext } from './Composants/AppContext';
import Routes from "./Composants/Routers/Routers";
import { useState, useEffect } from 'react';

require('bootstrap/dist/css/bootstrap.min.css')

function App() {
    const [userid, setUserid] = useState(null);
    const [profil, setProfil] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userid");
        if (storedUser) {
            setUserid(JSON.parse(storedUser));
            setProfil(JSON.parse(storedUser));
        }
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
        <UserContext.Provider value={{userid, profil, handleLogin, handleLogout, setProfil}}>
            <Routes />
        </UserContext.Provider>
    );
}

export default App;