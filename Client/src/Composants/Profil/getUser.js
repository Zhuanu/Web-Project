const GetUser = () => {
    
    const getuser = () => {
        window.location.href = "http://localhost:3000/profil";
    }

    return <li onClick={getuser} style={{ marginBottom: "50px"}}>
        <img src="/profil.png" alt = "icon" />
    </li>
}

export default GetUser;