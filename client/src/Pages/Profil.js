
import Log from '../Composants/Log';
import { useContext } from 'react';
import { UserContext } from '../Composants/AppContext';

const Profil = () => {
    const { user } = useContext(UserContext);


    return (
        user 
        ? 
        (<div className='profile-page'>Profile Page</div>) 
        :
        (<div className='log-page'>
            <div className='log-container'>
                <Log />
                <div className='img-container'>
                </div>
            </div>
        </div>)
    );
};

export default Profil;
