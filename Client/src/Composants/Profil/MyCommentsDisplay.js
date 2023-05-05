import { useContext, useEffect, useState } from "react";
import { UserContext } from "../AppContext";
import axios from "axios";
import styled from "styled-components";

import { TweetDisplay, CommentDisplay, TweetPicture, CommentPicture } from "./MyTweetsDisplay";


const MyCommentsDisplay = () => {
    const { profil } = useContext(UserContext);
    const [commentOfUser, setCommentOfUser] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/messages/get/${profil}/comment`,
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            setCommentOfUser(res.data.commentsFromUser);
        })
        .catch((err) => {
            console.log(err)
        });
    }, [profil]);

    return (
        <div className="myCommentsDisplay d-grid" style={{maxHeight: "100vh", overflowY: "auto"}}>
            {commentOfUser?.map((tweet) => {
                return (
                    <div key={tweet._id} className="" style={{maxHeight: "100vh", overflow: "auto"}}>
                        <TweetDisplay key={tweet._id} tweet={tweet} />
                    </div>
                );
            })}
        </div>
    );
};

export default MyCommentsDisplay;