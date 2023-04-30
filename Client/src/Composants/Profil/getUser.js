import { PersonCircle } from 'react-bootstrap-icons';

const GetUser = () => {
    
    const getuser = () => {
        window.location.href = "http://localhost:3000/profil";
    }

    return <div onClick={getuser} className='d-flex justify-content-center'>
        <PersonCircle className='icon' size={30} />
        <p className="flex-grow-0" style={{margin:"0 0 0 10px"}}>Profil</p>
    </div>
}

export default GetUser;