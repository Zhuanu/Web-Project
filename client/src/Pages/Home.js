import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Composants/AppContext';
import Log from '../Composants/Log';

const Home = () => {
    const { userid } = useContext(UserContext);

    return (
        userid ? (
        <div className='main-page'>
            <h1>Home Page</h1>
            <img src="https://i.goopics.net/kn9pe.jpg" alt = "icon" />
        </div>
        ) : (
        <div className='log-page'>
            <div className='log-container'>
                <Log />
                <div className='img-container'>
                </div>
            </div>
        </div>)
    );
};

export default Home;