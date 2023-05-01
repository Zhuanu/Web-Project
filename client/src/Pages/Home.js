import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Composants/AppContext';


import Log from '../Composants/Log/Log';
import NewTweetForm from '../Composants/Tweet/NewTweetForm';
import Suggestions from '../Composants/Profil/Suggestion';

const Home = () => {
    const { userid, listFollowing, setlistFollowing, user } = useContext(UserContext);

    return (
        userid ? (
        <div className='main-page'>
            <h1 className='text-center'>Home Page</h1>
            <div className='row'>
                <div className='col'>
                    <NewTweetForm user={user} listFollowing={listFollowing} setlistFollowing={setlistFollowing}/>
                </div>
                <div className='col'>
                    <Suggestions />
                </div>
            </div>
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