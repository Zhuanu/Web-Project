import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext, TweetContext } from '../Composants/AppContext';


import Log from '../Composants/Log/Log';
import TweetForm from '../Composants/Tweet/TweetForm';
import TweetsWall from '../Composants/Tweet/TweetsWall';
import Suggestions from '../Composants/Profil/Suggestion';
import axios from 'axios';

const Home = () => {
    const { userid } = useContext(UserContext);
    const [listTweet, setListTweet] = useState(null);
    const [isListTweetInitialised, setIsListTweetInitialised] = useState(false);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/messages',
            withCredentials: true,
        })
        .then((res) => {
            setListTweet(res.data.allTweets);
            setIsListTweetInitialised(true);
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        userid ? (

            isListTweetInitialised ? (

                <TweetContext.Provider value={{ listTweet, setListTweet }}>
                    <div className='main-page'>
                        <h1 className='text-center'>Home Page</h1>
                        <div className='d-flex' style={{padding: "3% 5% 0 5%"}}>
                            <div className='container' style={{paddingRight: "2%"}}>
                                <TweetForm isInitialised={isListTweetInitialised}/>
                                <TweetsWall />
                            </div>
                            <div className='container' style={{paddingLeft: "2%"}}>
                                <Suggestions />
                            </div>
                        </div>
                    </div>
                </TweetContext.Provider>

            ) : (

                <div>
                    <div className="d-flex align-items-center justify-content-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>  
                </div>

            )

        ) : (

            <div className='log-page'>
                <div className='log-container'>
                    <Log />
                    <div className='img-container'>
                    </div>
                </div>
            </div>

        )
    );
};

export default Home;