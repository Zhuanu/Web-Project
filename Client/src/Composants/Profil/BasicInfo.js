import { useEffect, useState } from "react";
import axios from "axios";

const BasicInfo = () => {
    const [email, setEmail] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/user/get",
            withCredentials: true,
        })
        .then((res) => {
            setEmail(res.data.email);
            setDateNaissance(res.data.dateNaissance);
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <div>
            <p>email: {email}</p>
            <p>date de naissance: {dateNaissance}</p>
        </div>
    );
}

export default BasicInfo;