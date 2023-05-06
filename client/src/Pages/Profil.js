import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Composants/AppContext';


import Log from '../Composants/Log/Log';
import ProfilPicture from '../Composants/Profil/ProfilPicture';
import MyFollowers from '../Composants/Profil/MyFollowers';
import MyFollowing from '../Composants/Profil/MyFollowing';
import Bio from '../Composants/Profil/Bio';
import EditProfil from '../Composants/Profil/EditProfil';
import NavProfil from '../Composants/Profil/NavProfil';

import MyTweetsDisplay from "../Composants/Profil/MyTweetsDisplay";
import MyCommentsDisplay from "../Composants/Profil/MyCommentsDisplay";
import BasicInfo from "../Composants/Profil/BasicInfo";
import UnfollowButton from '../Composants/Profil/UnfollowButton';
import FollowButton from '../Composants/Profil/FollowButton';


const Profil = () => {
    const { profil, userid, listFollowing, friend, setFriend } = useContext(UserContext);
    const [mode, setMode] = useState("tweet");

    useEffect(() => {
        const myFollowing = [];
        for (const follow of listFollowing) {
            myFollowing.push(follow._id);
        }
        const isFollowed = myFollowing.includes(profil)
        setFriend({...friend, isFollowed: isFollowed})
    }, [profil, listFollowing])

    const handlePersonalInformation = () => {
        setMode("personalInformation");
    };

    const handleTweet = () => {
        setMode("tweet");
    };

    const handleComment = () => {
        setMode("comment");
    };

    return (
        userid 
        ? 
        (<div className='profile-page row'>
            <div className='col-5 justify-content-center' style={{margin: "8% 0 0 8%"}}>
                <div className='d-flex border' style={{borderRadius: "20px"}}>
                    <ProfilPicture friend={friend} />
                    <div className='d-flex' style={{flexDirection: "column"}}>
                        <div className='flex-row d-flex p-4'>
                            <MyFollowers setFriend={setFriend} />
                            <MyFollowing setFriend={setFriend} />
                            <div className='ms-auto align-self-center'>{userid === profil ? <EditProfil/> : (friend.isFollowed ? <UnfollowButton userId={profil} friend={friend}/> : <FollowButton userId={profil} friend={friend}/>)}</div>
                        </div>
                        <Bio friend={friend}/>
                    </div>
                </div>
                <NavProfil handleTweet={handleTweet} handlePersonalInformation={handlePersonalInformation} handleComment={handleComment} />
            </div>
            <div className='col-5'>
                {mode === "tweet" && <MyTweetsDisplay />}
                {mode === "comment" && <MyCommentsDisplay />}
                {mode === "personalInformation" && (<BasicInfo />)}
            </div>
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
