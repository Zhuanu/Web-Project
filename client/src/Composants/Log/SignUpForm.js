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
        myForm.querySelectorAll('input').forEach((el) => {
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
            console.log("reset")
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
                <p id="header-error" style={{color: "red"}} className="form-text"></p>
                <h2 style={{fontSize: "2.2rem"}}>Create Your Account</h2>

                <form method="POST" action="" onSubmit={submitForm} id='myForm'>

                    <div className="mb-3">
                        <label htmlFor="identifiant" className="form-label">Login</label>
                        <input type="text" className="form-control" name="identifiant" id="identifiant" value={id} onChange={e => {setId(e.target.value)}}/>
                        <p className="form-text" style={{color: "red"}} id="login-error"></p>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" value={mdp} onChange={e => {setMdp(e.target.value)}}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirm" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="confirm" id="confirm" value={confirm} onChange={e => {setConfirm(e.target.value)}}/>
                    </div>

                    <br/>

                    <div className="mb-3">
                        <label htmlFor="pseudo" className='form-label'>Pseudo</label>
                        <input type="text" className='form-control' name="pseudo" id="pseudo" value={pseudo} onChange={e => {setPseudo(e.target.value)}}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="text" className='form-control' name="email" id="email" value={email} onChange={e => {setEmail(e.target.value)}}/>
                        <p className="form-text" style={{color: "red"}} id="email-error"></p>
                    </div>

                    <br/>

                    <div className="mb-3">
                        <label htmlFor="birthday" className='form-label'>Date de naissance</label>
                        <div className="d-flex">
                            <select className='form-select' id="birthday-day" onChange={(e) => {setJour(e.target.value);}}>
                                {tabJour}
                            </select>
                            <select className='form-select' id="birthday-month" onChange={(e) => {setMois(e.target.value);}}>
                                {tabMois}
                            </select>
                            <select className='form-select' id="birthday-year" onChange={(e) => {setAnnee(e.target.value);}}>
                                {tabAnnee}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" style={{borderRadius: "10px", height: "40px", width: "140px", fontSize: "1.1rem"}} className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>)
    );
};

export default SignUpForm;