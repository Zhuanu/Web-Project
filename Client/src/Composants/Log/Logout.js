import axios from 'axios';
import cookie from 'js-cookie';

const Logout = () => {
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
            // credentials: "include",
        })
        .then((res) => {
            console.log("data dans logout", res.data);
            console.log("cookie dans logout", cookie.get("accessToken"));
            removeCookie("accessToken");
            removeCookie("refreshToken");
            window.location.href = "http://localhost:3000/profil";
        })
        .catch(err => window.location.href = "http://localhost:3000/profil");
    }
    
    return <li onClick={logout}>
        <img src="/logout.jpg" alt = "icon" />
    </li>
}

export default Logout;