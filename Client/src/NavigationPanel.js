import Login from "./Login";
import Logout from "./Logout";

function NavigationPanel({login, logout, connect, register}) {
    return (
        <nav>{connect ? <Logout logout={logout} /> : <Login login={login} register={register}/>}
    
        </nav>);
}

export default NavigationPanel