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
            method: "DELETE",
            url: "http://localhost:8000/api/user/6441626122accafcaad7fd8b/logout",
            withCredentials: true,
            // credentials: "include",
        })
        .then((res) => {
            console.log("data dans logout", res.data);
            console.log("cookie dans logout", cookie.get("accessToken"));
            removeCookie("accessToken")
        })
        .catch(err => console.log(err));
    }
    
    return <li onClick={logout}>
        <img src="/logout.jpg" alt = "icon" />
    </li>
}

export default Logout;