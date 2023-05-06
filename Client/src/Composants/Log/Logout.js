import axios from 'axios';
import cookie from 'js-cookie';
import { useContext } from 'react';
import { UserContext } from '../AppContext';
import { BoxArrowLeft } from 'react-bootstrap-icons';

const Logout = () => {

    const { handleLogout } = useContext(UserContext);

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {
        await axios({
            method: "GET",
            url: "http://localhost:8000/api/user/logout",
            withCredentials: true,
        })
        .then((res) => {
            removeCookie("accessToken");
            removeCookie("refreshToken");
            removeCookie("id");
            handleLogout();
        })
        .catch(err => {
            console.log(err)
        });
    }
    
    return <div className="d-flex justify-content-end" onClick={logout}>
                <BoxArrowLeft className="icon" size={30} />
                <p className="flex-grow-0" style={{margin:"0 0 0 10px"}}>Log out</p>
            </div>
  
}

export default Logout;