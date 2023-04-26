import { useContext } from 'react';
import { UserContext } from '../Composants/AppContext';

import Log from '../Composants/Log';
import BasicInfo from '../Composants/Profil/BasicInfo';
import Follow from '../Composants/Profil/ProfilPicture';

const Profil = () => {
    const { userid } = useContext(UserContext);



    return (
        userid 
        ? 
        (<div className='profile-page'>
            {/* <h1>Profile Page</h1> */}
            <Follow />
            <BasicInfo />
        </div>)
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
