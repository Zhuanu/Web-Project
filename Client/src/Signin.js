import React, { useState , useEffect} from 'react'

function Signin({connexion}) {
    const [id, setId] = useState("")
    const [mdp, setMdp] = useState("")
    const[confirm, setConfirm] = useState("")
    const[error, setError] = useState(false)
    const[pseudo, setPseudo] = useState("")
    const[email, setEmail] = useState("")
    const[jour, setJour] = useState([])
    const[mois, setMois] = useState([])
    const[annee, setAnnee] = useState([])

    function submitForm(e) {
        e.preventDefault();
    }

    function register() {
        return mdp === confirm ? connexion() : setError(true);
    }

    function annuler() {
        setId("")
        setMdp("")
        setConfirm("")
        setPseudo("")
    }

    useEffect(() => {
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

        setJour(tab);
        setMois(tabMois);
        setAnnee(tabAnnee);
      }, []);
  

    return (
        <div className="signin">
            <h1>Register Account</h1>
            <form method="POST" action="" onSubmit={submitForm}>
                {/* <label for="identifiant">Identifiant</label> */}
                <input type="text" name="identifiant" id="identifiant" placeholder="Identifiant" value={id} onChange={e => {setId(e.target.value)}}/>
                <br/>
                {/* <label for="password">Mot de passe</label> */}
                <input type="password" name="password" id="password" placeholder="Password" value={mdp} onChange={e => {setMdp(e.target.value)}}/>
                <br/>
                {/* <label for="confirm">Confirm mot de passe</label> */}
                <input type="password" name="confirm" id="confirm" placeholder="Confirm Password" value={confirm} onChange={e=>{setConfirm(e.target.value)}}/>
                <br/>
                <br/>
                {/* <label htmlFor="pseudo">Pseudo</label> */}
                <input type="text" name="pseudo" id="pseudo" placeholder="Pseudo" value={pseudo} onChange={e => {setPseudo(e.target.value)}}/>
                <br/>
                {/* <label htmlFor="email">Email</label> */}
                <input type="text" name="email" id="email" placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}}/>
                <br/>
                <br/>
                <label htmlFor="birthday">Date de naissance :</label>
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
                <input type="submit" value="Register" onClick={register}/>
                <button type="reset" onClick={annuler}>Annuler</button>
                {error ? <p style={{color:"red"}}>Erreur: mots de passe différents</p> : <p></p>}
                <br/>
            </form>
        </div>);
}

export default Signin