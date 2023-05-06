import { useContext, useState } from "react";
import { UserContext } from "../AppContext";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

import ModifyTweetButton from "./ModifyTweetButton";
import DeleteTweetButton from "./DeleteTweetButton";
import LikeTweetButton from "./LikeTweetButton";
import { CustomDate } from "../Profil/MyTweetsDisplay";

const CommentPicture = styled.img`
    border-radius: 50%;
    height: 40px;
    width: 40px;
`;

const Comment = ({comment, setMyComments }) => {
    const [myComment , setMyComment] = useState(comment)
    const { userid, setFriend, setProfil } = useContext(UserContext);


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
        <div className='border-bottom border-top' style={{margin: "10px", borderRadius: "10px"}}>

                <div className='header d-flex justify-content-between' style={{padding: "0"}}>
                    <Link to={`/profil/${comment.userid}`} style={{textDecoration: "none"}} className="d-flex align-items-center" onClick={() => { handleRedirect(comment.userid) }}>
                        {myComment.picture ? (<CommentPicture src={`/uploads/${myComment.userid}.jpg`} alt='pp'/>) : (<CommentPicture src="/uploads/default.jpg" alt='pp'/>)}
                        <span style={{ marginLeft: "15px" }}>@{myComment.pseudo}</span>
                    </Link>

                    <div className="buttonGroup d-flex">
                        {myComment.userid === userid ? (
                            <div className="myButton d-flex" style={{}}>
                                <ModifyTweetButton myComment={myComment} setMyComment={setMyComment} />
                                <DeleteTweetButton myComment={myComment} />
                            </div>
                        ) : (<span></span>)}
                        <LikeTweetButton myComment={myComment} setMyComment={setMyComment}/>
                    </div>
                </div>

                <div className="body">
                    <p className='d-grid'
                        style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", borderRadius: "10px", padding: "4px", margin: "7px 20px 0 70px", fontSize: "1.15rem"}}
                    >
                        {myComment.text}
                    </p>
                    <div style={{margin: "7px 20px"}}>
                        <p className="align-self-center" style={{marginRight: "5px", marginBottom: "0"}}>Last edited the <CustomDate customDate={myComment.date} /></p>
                        <p><b>{myComment?.likers?.length}</b> likes</p>
                    </div>
                </div>

        </div>
    );
};

export default Comment;