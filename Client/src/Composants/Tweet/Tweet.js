import { useContext, useState } from "react";
import { UserContext } from "../AppContext";
import styled from "styled-components";

import LikeTweetButton from "./LikeTweetButton";
import DeleteTweetButton from "./DeleteTweetButton";
import EditTweetButton from "./ModifyTweetButton"

const ProfilPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: block;
`;

const Tweet = ({tweet}) => {
    const [myTweet , setMyTweet] = useState(tweet)
    const { userid } = useContext(UserContext);

    return (
        <div className="tweet border">

            <div className="tweet__header">
                <div className="tweet__header__user">
                    <div className="tweet__header__user__avatar">
                        {myTweet.picture ? (<ProfilPicture src={`/uploads/${myTweet.userid}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                    </div>
                    <div className="tweet__header__user__name">
                        @{myTweet.pseudo}
                    </div>
                    {myTweet.userid === userid ? (null) : (<p>Bouton ajouter</p>)}
                </div>
            </div>

            <div className="tweet__content">
                <p className="tweet__content__text">{myTweet.content}</p>
                <div className="tweet__content__date">Last Edited {myTweet.date}</div>
                <p className="tweet_info">nb de likes</p>
            </div>

            <div className="tweet__footer">
                <LikeTweetButton myTweet={myTweet} />
                {tweet.userid === userid ? (
                    <div className="myButton">
                        <DeleteTweetButton myTweet={myTweet} />
                        <EditTweetButton myTweet={myTweet} setMyTweet={setMyTweet}/>
                    </div>
                ) : (null)}
            </div>

        </div>
  
    );
}

export default Tweet;