import { useContext } from "react";
import { UserContext } from "../AppContext";

const NavProfil = ({handleComment, handlePersonalInformation, handleTweet}) => {
    const { userid, profil } = useContext(UserContext);

    return (
        <div className="d-grid" style={{marginTop: "10%"}}>
            <ul className="container-fluid list-unstyled nav nav-tabs d-flex">
                {userid === profil ? (
                    <button className="nav-link flex-grow-1 text-light" onClick={handlePersonalInformation}>Personal Information</button>
                ) : null}
                <button className="nav-link flex-grow-1 text-light" onClick={handleTweet}>Tweet</button>
                <button className="nav-link flex-grow-1 text-light" onClick={handleComment}>Comment</button>
            </ul>
        </div>
    );
};

export default NavProfil;