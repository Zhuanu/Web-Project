import { useState, useEffect } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [id, setId] = useState("")
    const [mdp, setMdp] = useState("")
    const [confirm, setConfirm] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [jour, setJour] = useState([])
    const [mois, setMois] = useState([])
    const [annee, setAnnee] = useState([])

    const [error, setError] = useState(false)
    const [isReset, setIsReset] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

    const headerDisplay = document.getElementById('header-display');
    const headerError = document.getElementById('header-error');
    const loginError = document.getElementById('login-error');
    const emailError = document.getElementById('email-error');
    const myForm = document.getElementById('myForm');

    const submitForm = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:8000/api/user',
            withCredentials: true,
            data: {
                login: id,
                password: mdp,
                pseudo: pseudo,
                email: email,
                dateNaissance: "01/01/01"
            }
        })
        .then(res => {
            setIsSubmit(true);
            headerDisplay.innerHTML = res.data.message;
        })
        .catch(err => {
            console.log(err.response.data)
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

    function populateDate() {
         // Remplir les options de la liste des jours
         const tab = [];
         for (let i = 1; i <= 31; i++) {
             tab.push(<option key={i} value={i}>{i}</option>);
         }
 
         // Remplir les options de la liste des mois
         const months = [
             'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
             'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
         ];
         const tabMois = []
         for (let i = 0; i < months.length; i++) {
             tabMois.push(<option key={months[i]} value={months[i]}>{months[i]}</option>);
         }
 
         // Remplir les options de la liste des années
         const currentYear = new Date().getFullYear();
         const tabAnnee = []
         for (let i = currentYear; i >= currentYear - 100; i--) {
             tabAnnee.push(<option key={i} value={i}>{i}</option>);
         }
 
        //  setJour(tab);
        //  setMois(tabMois);
        //  setAnnee(tabAnnee);
    }

    useEffect(() => {
        populateDate();
    }, []);


    useEffect(() => {
        if (isReset) {
            setId("");
            setMdp("");
            setConfirm("");
            setPseudo("");
            setIsReset(false);
        }
    }, [isReset]);


    return (
        isSubmit 
            ? <>
                <SignInForm /> 
                <h3 className="form-text" id="headerDisplay"></h3>
            </>
            :
            <div className="signin">
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
                    {error ? <p className='form-text'>Erreur: mots de passe différents</p> : <p></p>}
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
                    <p className="form-text" id="emil-error"></p>
                    <br/>
                    <br/>
                    <label htmlFor="birthday">Date de naissance :</label>
                    <br/>
                    <div className="scroll-container">
                        <select id="birthday-day">
                            <option key="Jour" value="Jour">-- Jour --</option>
                            {jour}
                        </select>
                        <select id="birthday-month">
                            <option key="Mois" value="Mois">-- Mois --</option>
                            {mois}
                        </select>
                        <select id="birthday-year">
                            <option key="Année" value="Année">-- Année --</option>
                            {annee}
                        </select>
                    </div>
                    <br/>
                    <button>Register</button>
                    <br/>
                </form>
            </div>
    );
};

export default SignUpForm;