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
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handleMode} id='register' className={mode ? 'active-btn' : null}>S'inscrire</li>
                    <li onClick={handleMode} id='login' className={!mode ? 'active-btn' : null}>Se connecter</li>
                </ul>
                {!mode && <SignUpForm />}
                {mode && <SignInForm />}
            </div>
        </div>
    );
}

export default Log;