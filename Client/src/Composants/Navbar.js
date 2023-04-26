import { useContext } from 'react';
import { UserContext } from './AppContext';
// import axios from 'axios';
import Logout from './Log/Logout';
import GetUser from './Profil/GetUser';
import '../App.css'

// aide moi à coder le useEffect pour que le composant se mette à jour quand on se connecte ou quand on se déconnecte

const Navbar = () => {
    const { userid } = useContext(UserContext);
    
    console.log(userid);

    return (
        userid 
        ? (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <ul>
                            <li>logo</li>
                            <li>nom du site</li>
                        </ul>
                    </a>
                    <GetUser />
                    {/* <p>Bienvenue @{user.profil.pseudo}</p> */}
                    <Logout />
                </div>
            </nav>
        ) :
        (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <ul>
                    <li>logo</li>
                    <li>nom du site</li>
                </ul>
            </div>
        </nav>)
    );
}

export default Navbar;