import { useState, useEffect } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';
import { populateDate } from './utils';

const SignUpForm = () => {
    const [id, setId] = useState("")
    const [mdp, setMdp] = useState("")
    const [confirm, setConfirm] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [jour, setJour] = useState("1")
    const [mois, setMois] = useState("Janvier")
    const [annee, setAnnee] = useState("2023")

    const [isReset, setIsReset] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

    const headerError = document.getElementById('header-error');
    const loginError = document.getElementById('login-error');
    const emailError = document.getElementById('email-error');
    const myForm = document.getElementById('myForm');

    const [tabJour, tabMois, tabAnnee] = populateDate();

    const submitForm = (e) => {
        e.preventDefault();

        loginError.innerHTML = "";
        emailError.innerHTML = "";
        headerError.innerHTML = "";

        if (mdp !== confirm) {
            resetForm();
            headerError.innerHTML = "Les mots de passe ne correspondent pas";
            return;
        }

        axios({
            method: 'post',
            url: 'http://localhost:8000/api/user',
            withCredentials: true,
            data: {
                login: id,
                password: mdp,
                pseudo: pseudo,
                email: email,
                dateNaissance: `${mois} ${jour}, ${annee}`
            }
        })
        .then(res => {
            setIsSubmit(true);
        })
        .catch(err => {
            if (err.response.data.error === 'login') {
                loginError.innerHTML = err.response.data.message;
            }
            else if (err.response.data.error === 'email') {
                emailError.innerHTML = err.response.data.message;
            }
            else if (err.response.data.error === 'header') {
                headerError.innerHTML = err.response.data.message;
            }
            else {
                console.log(err)
            }
            resetForm();
        });
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
            setConfirm("");
            setPseudo("");
            setEmail("");
            setIsReset(false);
        }
    }, [isReset]);

    return (
        isSubmit 
            ? 
            (<>
                <h3 className="form-text">User successfully created, Welcome, You can now Log In</h3>
                <SignInForm /> 
            </>)
            :
            (<div className="signin">
                <p id="header-error" className="form-text"></p>
                <h1>Register Account</h1>

                <form method="POST" action="" onSubmit={submitForm} id='myForm'>
                    <label htmlFor="identifiant">Login</label>
                    <br/>
                    <input type="text" name="identifiant" id="identifiant" value={id} 
                        onChange={e => {setId(e.target.value)}}/>
                    <p className="form-text" id="login-error"></p>
                    <br/>

                    <label htmlFor="password">Mot de passe</label>
                    <br/>
                    <input type="password" name="password" id="password" value={mdp} 
                        onChange={e => {setMdp(e.target.value)}}/>
                    <br/>
                    <label htmlFor="confirm">Confirm mot de passe</label>
                    <br/>
                    <input type="password" name="confirm" id="confirm" value={confirm} 
                        onChange={e=>{setConfirm(e.target.value)}}/>
                    <br/>
                    <br/>

                    <label htmlFor="pseudo">Pseudo</label>
                    <br/>
                    <input type="text" name="pseudo" id="pseudo" value={pseudo} 
                        onChange={e => {setPseudo(e.target.value)}}/>
                    <br/>

                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="text" name="email" id="email" value={email} 
                        onChange={e => {setEmail(e.target.value)}}/>
                    <br/>
                    <p className="form-text" id="email-error"></p>
                    <br/>
                    <br/>

                    <label htmlFor="birthday">Date de naissance :</label>
                    <br/>
                    <div className="scroll-container">
                        <select id="birthday-day" onChange={(e) => {setJour(e.target.value);}}>
                            {tabJour}
                        </select>
                        <select id="birthday-month" onChange={(e) => {setMois(e.target.value);}}>
                            {tabMois}
                        </select>
                        <select id="birthday-year" onChange={(e) => {setAnnee(e.target.value);}}>
                            {tabAnnee}
                        </select>
                    </div>
                    <br/>
                    <button>Register</button>
                    <br/>
                </form>
            </div>)
    );
};

export default SignUpForm;