import { useState } from "react";
import NavigationPanel from "./NavigationPanel"
import Signin from "./Signin"

function MainPage() {
    const [connect, setConnect] = useState(false);
    const [page, setPage] = useState("page de connexion");

    function getConnected() {
        setConnect(true);
        setPage("message page");
    }

    function setLogout() {
        setConnect(false);
        setPage("page de connexion");
    }

    function setSignin() {
        setPage("sign in page");
    }

    function setLogin() {
        setPage("page de connexion");
    }

    return page === "sign in page" ? <Signin connexion={setLogin}/> : <NavigationPanel login={getConnected} logout={setLogout} connect={connect} register={setSignin}/>
}

export default MainPage