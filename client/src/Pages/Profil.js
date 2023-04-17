import React from 'react';
import Log from '../Composants/Log';

const Profil = () => {
    return (
        <div className='profil-page'>
            <div className='log-container'>
                <Log />
                <div className='img-container'>
                    {/* // trouve moi l'image dans le dossier public */}
                    <img src='' alt='profil' />
                </div>
            </div>
        </div>
    );
};

export default Profil;
