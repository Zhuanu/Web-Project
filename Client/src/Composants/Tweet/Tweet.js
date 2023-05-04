import { useContext, useEffect, useState } from "react";
import { UserContext, CommentContext } from "../AppContext";
import styled from "styled-components";
import axios from "axios";

import LikeTweetButton from "./LikeTweetButton";
import DeleteTweetButton from "./DeleteTweetButton";
import EditTweetButton from "./ModifyTweetButton"
import FollowButton from "../Profil/FollowButton"
import UnfollowButton from "../Profil/UnfollowButton"
import CommentTweetButton from "./CommentTweetButton";

const ProfilPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

const Tweet = ({tweet}) => {
    const [myTweet , setMyTweet] = useState(tweet)
    const { listFollowing, setlistFollowing, userid } = useContext(UserContext);
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
            console.log(res.data)
            setListComments(res.data.commentsFromTweet)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [myTweet._id])

    return (
        <CommentContext.Provider value={{listComments, setListComments}}>
            <div className='card' style={{borderRadius: "40px 0px 0px 40px", margin: "10px 0 10px 0px"}}>

                <div className='card-header d-flex'>
                    <div className="left">
                        {myTweet.picture ? (<ProfilPicture src={`/uploads/${myTweet.userid}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                        <span style={{ marginLeft: "5px" }}>@{myTweet.pseudo}</span>
                    </div>
                    <div style={{marginTop: "5px", marginLeft: "auto" }}>
                        {userid.toString() === myTweet.userid.toString() 
                            ? (null) 
                            : myTweet.isFollowed  
                                ? <UnfollowButton userId={myTweet.userid} list={listFollowing} setList={setlistFollowing} tweet={myTweet}/>
                                : <FollowButton userId={myTweet.userid} list={listFollowing} setList={setlistFollowing} tweet={myTweet}/>}
                    </div>
                </div>

                <div className='card-body'>
                    <p className='card-text' style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", borderRadius: "10px", border: "border: 3px inset rgba(28,110,164,0.74)", padding: "0 5px 0 5px"}}>{myTweet.content}</p>
                    <div style={{borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}}>
                        <p style={{margin: "0"}}>
                            Last edited {myTweet.date.slice(0, 10)} at {myTweet.date.slice(11, 16)}
                        </p>
                        <div className="d-flex justify-content-between">
                            <span><b>{myTweet?.likers?.length}</b> likes</span>
                            <span><b>{listComments.length}</b> comments</span>
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