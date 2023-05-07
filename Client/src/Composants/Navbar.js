import { useContext } from 'react';
import { UserContext } from './AppContext';
import Logout from './Log/Logout';
import GetUser from './Profil/GetUser';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Logo = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;


const Navbar = () => {
    const { userid } = useContext(UserContext);

    const toHome = () => {
        const toHome = () => {
            window.location.href = "http://localhost:3000";
        }
        return (
            <div onClick={toHome} className="d-flex">
                <Logo className='icon' size={30} src={`/uploads/default.jpg`} alt="pp"/>
                <p className="flex-grow-0" style={{margin:"0 0 0 10px"}}> Prism </p>
            </div>
        );
    }


    return (
        userid 
        ? (

            <nav className="navbar navbar-expand-lg navbar-light bg-light nav nav-tabs">
                <button className="nav-link col-2">{toHome()}</button>
                <button className="nav-link col-2"><GetUser /></button>
                <SearchBar />
                <button className="nav-link col-2 ms-auto"><Logout /></button>
            </nav>

        ) : (

            <ul className='container-fluid list-unstyled nav nav-tabs'>
                <li className=''>
                    <button className="nav-link text-start">{toHome()}</button>
                </li>
            </ul>
        )
    );
}

export default Navbar;