import React from 'react';

const SignUpForm = () => {
    return (
        <div className='sign-up-form'>
            <form action=''>
                <input type='text' placeholder='Nom' />
                <input type='text' placeholder='Prénom' />
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Mot de passe' />
                <input type='password' placeholder='Confirmer mot de passe' />
                <input type='submit' value="S'inscrire" />
            </form>
        </div>
    );
};

export default SignUpForm;