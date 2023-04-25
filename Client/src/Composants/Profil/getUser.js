// import axios from 'axios';

const GetUser = () => {
    // const getuser = async () => {
    //     await axios({
    //         method: "GET",
    //         url: "http://localhost:8000/api/user/get",
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         console.log("data dans getUser", res.data);
    //     })
    //     .catch(err => window.location.href = "http://localhost:3000/profil");
    // }
    const getuser = () => {
        window.location.href = "http://localhost:3000/profil";
    }

    return <li onClick={getuser}>
        <img src="/profil.png" alt = "icon" />
    </li>
}

export default GetUser;