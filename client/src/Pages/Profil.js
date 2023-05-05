import { useContext, useState } from 'react';
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


const Profil = () => {
    const { profil, userid } = useContext(UserContext);
    const [friend, setFriend] = useState({});
    const [mode, setMode] = useState("tweet");

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
        (<div className='profile-page row justify-content-center' style={{height: "100vh", maxHeight: "100vh"}}>
            <div className='col' style={{padding: "50px 0"}}>
                <div className='d-flex border p-3' style={{borderRadius: "20px", marginLeft: "10%"}}>
                    <ProfilPicture friend={friend} />
                    <div className='d-grid'>
                        <div className='d-flex align-items-center'>
                            <MyFollowers setFriend={setFriend} />
                            <MyFollowing setFriend={setFriend} />
                            {userid === profil ? <EditProfil/> : null}
                        </div>
                        <Bio friend={friend}/>
                    </div>
                </div>
                <NavProfil handleTweet={handleTweet} handlePersonalInformation={handlePersonalInformation} handleComment={handleComment} />
            </div>
            <div className='col'>
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
