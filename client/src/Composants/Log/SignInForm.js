import { useEffect, useState } from "react";
import axios from "axios";


const SignInForm = () => {
    const [id, setId] = useState("");
    const [mdp, setMdp] = useState("");
    const [isReset, setIsReset] = useState(false);

    const loginError = document.getElementById("login-error");
    const mdpError = document.getElementById("mdp-error");
    const headerError = document.getElementById("header-error");
    const myForm = document.getElementById("myForm");


    const submitForm = (e) => {
        e.preventDefault();

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
            console.log(res.data);
            window.location.href = "http://localhost:3000/";
        })
        .catch(err => {
            if (err.response.data.error === "login") {
                loginError.innerHTML = err.response.data.message;
            }
            else if (err.response.data.error === "mdp") {
                mdpError.innerHTML = err.response.data.message;
            }
            else if (err.response.data.error === "header"){
                headerError.innerHTML = err.response.data.message;
            }
            else {
                console.log(err);
            }
            myForm.reset();
        })
    }

    function resetForm() {
        // Parcours de tous les éléments du formulaire
        myForm.querySelectorAll('input').forEach((el) => {
          // Réinitialisation de la valeur à vide
          el.value = '';
        });
        setIsReset(true);
    }


    useEffect(() => {
        if (isReset) {
            setId("");
            setMdp("");
            setIsReset(false);
        }
    }, [isReset]);


    return (
        <div className="login">
            <p id="header-error" className="form-text"></p>
            <h1>Ouvrir une session</h1>
            <form method="POST" action="" onSubmit={submitForm} id="myForm">
                <label htmlFor="username" className="form-label">Login</label>
                <br/>
                <input type="text" name="username" id="username" value={id} 
                    onChange={e => {setId(e.target.value)}}/>
                <br/>
                <p className="form-text" id="login-error"></p>
                <label htmlFor="password">Mot de passe</label>
                <br/>
                <input type="password" name="password" id="password" value={mdp} 
                    onChange={e => {setMdp(e.target.value)}}/>
                <br/>
                <p className="form-text" id="mdp-error"></p>
                <br/>
                <button onClick={() => {
                    loginError.innerHTML = " ";
                    mdpError.innerHTML = " ";
                    headerError.innerHTML = " ";
                    resetForm();
                }}>Se Connecter</button>
                <br/>
            </form>
        </div>);
};

export default SignInForm;