import { useState } from "react";


function Login({login, register}) {
    const [id, setId] = useState("")
    const [mdp, setMdp] = useState("")

    function submitForm(e) {
        e.preventDefault();
    }

    function annuler() {
        setId("")
        setMdp("")
    }

    return (
    <div className="login">
        <h1>Ouvrir une session</h1>
        <form method="POST" action="" onSubmit={submitForm}>
            {/* <label for="username">Nom d'utilisateur</label> */}
            <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" value={id} onChange={e => {setId(e.target.value)}}/>
            <br/>
            {/* <label for="password">Mot de passe</label> */}
            <input type="password" name="password" id="password" placeholder="Mot de passe" value={mdp} onChange={e => {setMdp(e.target.value)}}/>
            <br/>
            <input type="submit" value="Se connecter" onClick={login}/>
            <input type="reset" value="Annuler" onClick={annuler}/>
            <input type="submit" value="Register" onClick={register}/>
            <br/>
        </form>
    </div>);    
}

export default Login