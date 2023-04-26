import './App.css';
import { UserContext } from './Composants/AppContext';
import Routes from "./Composants/Routers/index";
import { useState, useEffect } from 'react';

require('bootstrap/dist/css/bootstrap.min.css')

function App() {
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userid");
        if (storedUser) {
            setUserid(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (userid) => {
        localStorage.setItem("userid", JSON.stringify(userid));
        setUserid(userid);
    };

    const handleLogout = () => {
        localStorage.removeItem("userid");
        setUserid(null);
    };
    
    return (
        <UserContext.Provider value={{userid, handleLogin, handleLogout}}>
            <Routes />
        </UserContext.Provider>
    );
}

export default App;