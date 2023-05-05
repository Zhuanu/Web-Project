import { useContext } from "react";
import { UserContext } from "../AppContext";

const BasicInfo = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="border" style={{borderRadius: "10px", margin: "15%", padding: "5%"}}>
            <p>email: {user?.email}</p>
            <p>date de naissance: {user?.dateNaissance}</p>
            <p>Et plein d'informations confidentielles etc...</p>
        </div>
    );
}

export default BasicInfo;