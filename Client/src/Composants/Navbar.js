import { useContext } from 'react';
import { UserContext } from './AppContext';
// import axios from 'axios';
import Logout from './Log/Logout';
import GetUser from './Profil/GetUser';
import styled from 'styled-components';

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
            userid ? (
            <div onClick={toHome} className="d-flex justify-content-left">
                <Logo className='icon' size={30} src={`/uploads/default.jpg`} alt="pp"/>
                <p className="flex-grow-0" style={{margin:"0 0 0 10px"}}> Prism </p>
            </div>
            ) : (
            <div className="d-flex justify-content-center">
                <Logo className='icon' size={30} src={`/uploads/default.jpg`} alt="pp"/>
                <p className="flex-grow-0" style={{margin:"0 0 0 10px"}}> Prism </p>
            </div>
            )
        );
    }


    return (
        userid 
        ? (
            <ul className="container-fluid list-unstyled nav nav-tabs">
                <li className='p-2 flex-grow-1'>
                    <a className="nav-link text-start">{toHome()}</a>
                </li>
                <li className='p-2 flex-grow-1'>
                    <a className="nav-link text-center"><GetUser /></a>
                </li>
                <li className='p-2 flex-grow-1'>
                    <a className="nav-link text-end"><Logout /></a>
                </li>
            </ul>

        ) : (

            <ul className='container-fluid list-unstyled nav nav-tabs'>
                <li className='p-2 flex-grow-1'>
                    <a className="nav-link text-start">{toHome()}</a>
                </li>
            </ul>
        )
    );
}

export default Navbar;