import { useContext } from 'react';
import { UserContext } from './AppContext';
// import axios from 'axios';
import Logout from './Log/Logout';
import GetUser from './Profil/GetUser';
import '../App.css'

// aide moi à coder le useEffect pour que le composant se mette à jour quand on se connecte ou quand on se déconnecte

const Navbar = () => {
    const { userid } = useContext(UserContext);

    return (
        userid 
        ? (
            <ul className="container-fluid list-unstyled nav nav-tabs">
                <li className='p-2 flex-grow-1'>
                    <a className="nav-link text-start">logo + nom du site</a>
                </li>
                <li className='p-2 flex-grow-1'>
                    <a className="nav-link text-center"><GetUser /></a>
                </li>
                <li className='p-2 flex-grow-1'>
                    <a className="nav-link text-end"><Logout /></a>
                </li>
            </ul>

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