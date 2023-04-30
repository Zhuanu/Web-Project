import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Composants/AppContext';
import axios from 'axios';


import Log from '../Composants/Log';
import NewTweetForm from '../Composants/Tweet/NewTweetForm';
import Suggestions from '../Composants/Profil/Suggestion';

const Home = () => {
    const { userid } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [listFollowing, setlistFollowing] = useState([]);

    useEffect(() => {
        axios ({
            method: 'GET',
            url: 'http://localhost:8000/api/user/get',
            withCredentials: true,
        })
        .then ((res) => {
            console.log(res.data)
            setUser(res.data)
        })
        .catch ((err) => {
            console.log(err)
        })

        axios ({
            method: 'GET',
            url: 'http://localhost:8000/api/friend/following',
            withCredentials: true,
        })
        .then((res) => {
            setlistFollowing(res.data.following)
        })
        .catch ((err) => {
            console.log(err)
        })

    }, [])

    return (
        userid ? (
        <div className='main-page'>
            <h1 className='text-center'>Home Page</h1>
            <div className='row'>
                <div className='col'>
                    <NewTweetForm user={user} listFollowing={listFollowing} setlistFollowing={setlistFollowing}/>
                </div>
                <div className='col'>
                    <Suggestions user={user} listFollowing={listFollowing} setlistFollowing={setlistFollowing}/>
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