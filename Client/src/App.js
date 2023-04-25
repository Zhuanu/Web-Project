import './App.css';
import { UserContext } from './Composants/AppContext';
import Routes from "./Composants/Routers/index";
import { useState, useEffect } from 'react';

require('bootstrap/dist/css/bootstrap.min.css')

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    
    return (
        <UserContext.Provider value={{user, handleLogin, handleLogout}}>
            <Routes />
        </UserContext.Provider>
    );
}

export default App;