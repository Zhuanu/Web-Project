import { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = () => {
    const [mode, setMode] = useState(true);

    const handleMode = (e) => {
        if (e.target.id === 'register') setMode(false);
        else setMode(true);
    };

    return (
        <div className='connection-form' style={{height: "100vh"}}>
            <div className="d-grid container col justify-content-center">
                <ul className='list-unstyled'>
                    <li onClick={handleMode} id='register' className="btn btn-primary" data-bs-toggle="button">S'inscrire</li>
                    <li onClick={handleMode} id='login' className="btn btn-primary" data-bs-toggle="button">Se connecter</li>
                </ul>
                {!mode && <div className=''><SignUpForm/></div>}
                {mode && <div className=''><SignInForm /></div>}
            </div>
        </div>
    );
}

export default Log;