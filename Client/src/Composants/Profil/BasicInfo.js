import { useContext } from "react";
import { UserContext } from "../AppContext";

const BasicInfo = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <p>email: {user?.email}</p>
            <p>date de naissance: {user?.dateNaissance}</p>
        </div>
    );
}

export default BasicInfo;