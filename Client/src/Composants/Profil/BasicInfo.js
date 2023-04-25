import { useContext } from "react";
import { UserContext } from "../../Composants/AppContext";

const BasicInfo = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Basic Information</h1>
            <p>Username: {user.profil.pseudo}</p>
            <p>Email: {user.email}</p>
            <p>Birthdate : {user.dateNaissance}</p>
        </div>
    );
}

export default BasicInfo;