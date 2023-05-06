import { useContext, useEffect, useState } from "react";
import { UserContext, CommentContext } from "../AppContext";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

import LikeTweetButton from "./LikeTweetButton";
import DeleteTweetButton from "./DeleteTweetButton";
import EditTweetButton from "./ModifyTweetButton"
import FollowButton from "../Profil/FollowButton"
import UnfollowButton from "../Profil/UnfollowButton"
import CommentTweetButton from "./CommentTweetButton";
import { CustomDate } from "../Profil/MyTweetsDisplay";

const ProfilPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

const Tweet = ({tweet}) => {
    const [myTweet , setMyTweet] = useState(tweet)
    const { listFollowing, setlistFollowing, userid, setProfil, setFriend } = useContext(UserContext);
    const [listComments, setListComments] = useState([])

    useEffect(() => {
        const myFollowing = [];
        for (const follow of listFollowing) {
            myFollowing.push(follow._id);
        }
        const isFollowed = myFollowing.includes(myTweet.userid)
        setMyTweet({...myTweet, isFollowed: isFollowed})
    }, [myTweet._id, listFollowing])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/messages/comment/${myTweet._id}`,
            withCredentials: true,
        })
        .then((res) => {
            setListComments(res.data.commentsFromTweet)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [myTweet._id])

    const handleRedirect = (userid) => {
        setProfil(userid);
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/user/get/${userid}`,
            withCredentials: true,
        })
        .then((res) => {
            setFriend(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    };

    return (
        <CommentContext.Provider value={{listComments, setListComments}}>
            <div className='card' style={{borderRadius: "40px 40px 40px 40px", margin: "10px 0 10px 0px", opacity: "0.9"}}>

                <div className='card-header d-flex'>
                    <Link to={`/profil/${myTweet.userid}`} style={{textDecoration: "none"}} className="d-flex align-items-center" onClick={() => { handleRedirect(myTweet.userid) }}>
                        {myTweet.picture ? (<ProfilPicture src={`/uploads/${myTweet.userid}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                        <span style={{ marginLeft: "15px" }}>@{myTweet.pseudo}</span>
                    </Link>
                    <div style={{marginTop: "5px", marginLeft: "auto" }}>
                        {userid.toString() === myTweet.userid.toString() 
                            ? (null) 
                            : myTweet.isFollowed  
                                ? <UnfollowButton userId={myTweet.userid} list={listFollowing} setList={setlistFollowing} tweet={myTweet}/>
                                : <FollowButton userId={myTweet.userid} list={listFollowing} setList={setlistFollowing} tweet={myTweet}/>}
                    </div>
                </div>

                <div className='card-body'>
                    <p className='card-text' 
                        style={{borderRadius: "10px", border: "border: 3px inset rgba(28,110,164,0.74)", padding: "0 40px", fontSize: "1.15rem"}}
                    >{myTweet.content}</p>

                    <div style={{ marginLeft: "15px"}}>
                        <div className="d-grid">
                            <p className="align-self-center" style={{marginRight: "5px", marginBottom: "0"}}>Last edited the <CustomDate customDate={myTweet.date} /></p>
                            <span><b>{myTweet?.likers?.length}</b> Likes</span>
                            <span><b>{listComments.length}</b> Comments</span>
                        </div>
                    </div>

                    <div className="buttonGroup d-flex justify-content-between" style={{margin: "auto"}}>
                        {myTweet.userid === userid ? (
                            <div className="myButton d-flex" style={{}}>
                                <DeleteTweetButton myTweet={myTweet} />
                                <EditTweetButton myTweet={myTweet} setMyTweet={setMyTweet}/>
                            </div>
                        ) : (<span></span>)}
                        <div className="d-flex">
                            <CommentTweetButton myTweet={myTweet} setMyTweet={setMyTweet} />
                            <LikeTweetButton myTweet={myTweet} setMyTweet={setMyTweet} />
                        </div>
                    </div>
                </div>

            </div>
        </CommentContext.Provider>
    )
}

export default Tweet;