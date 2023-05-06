import { useContext } from 'react';
import { UserContext } from './AppContext';
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
            // <ul className="container-fluid d-flex list-unstyled nav nav-tabs">
            //     <li className=' col p-2'>
            //         <button className="nav-link text-start">{toHome()}</button>
            //     </li>
            //     <li className='col p-2'>
            //         <button className="nav-link text-center"><GetUser /></button>
            //     </li>
            //     <form class="col d-flex p-2" role="search">
            //         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            //         <button class="btn btn-outline-success" type="submit">Search</button>
            //     </form>
            //     <li className='col p-2'>
            //         <button className="nav-link text-end"><Logout /></button>
            //     </li>
            // </ul>

            <nav className="navbar navbar-expand-lg navbar-light bg-light nav nav-tabs">
                <button className="nav-link col">{toHome()}</button>
                <button className="nav-link col"><GetUser /></button>
                <form className="col d-flex p-2" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <button className="nav-link col"><Logout /></button>
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