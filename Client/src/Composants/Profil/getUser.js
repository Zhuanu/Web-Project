import axios from 'axios';
import cookie from 'js-cookie';

const GetUser = () => {
    const getuser = async () => {
        await axios({
            method: "GET",
            url: "http://localhost:8000/api/user/6441626122accafcaad7fd8b",
            withCredentials: true,
        })
        .then((res) => {
            console.log("data dans getUser", res.data);
            console.log("cookie dans getUser", cookie.get("accessToken"));
        })
        .catch(err => console.log(err));
    }

    return <li onClick={getuser}>
        <img src="/profil.png" alt = "icon" />
    </li>
}

export default GetUser;