import { useState } from "react";
import axios from "axios";


const SignInForm = () => {
    const [id, setId] = useState("")
    const [mdp, setMdp] = useState("")

    const submitForm = (e) => {
        e.preventDefault();

        const loginError = document.getElementById("login-error");

        axios({
            method: "POST",
            url: "http://localhost:8000/api/user/login",
            withCredentials: true,
            data: {
                login: id, 
                password: mdp
            }
        })
        .then(res => {
            if (res.data.status !== 200) {
                console.log("entré ?");
                loginError.innerHTML = res.data.message;
            }
            else {
                console.log(res.data);
                window.location.href = "http://localhost:3000/";
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="login">
            <h1>Ouvrir une session</h1>
            <form method="POST" action="" onSubmit={submitForm}>
                <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                <br/>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={id} 
                    onChange={e => {setId(e.target.value)}}/>
                <br/>
                <div className="form-text" id="login-error"></div>
                <label htmlFor="password">Mot de passe</label>
                <br/>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={mdp} 
                    onChange={e => {setMdp(e.target.value)}}/>
                <br/>
                <input type="submit" value="Se connecter"/>
                <br/>
            </form>
        </div>);
};

export default SignInForm;