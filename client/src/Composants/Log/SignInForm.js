import React from "react";

const SignInForm = () => {
    return (
        <div className="sign-in-form">
            <form action="">
                <input type="text" placeholder="Login" />
                <input type="password" placeholder="Mot de passe" />
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    );
};

export default SignInForm;