import { useContext, useState } from "react";
import { UserContext } from "../AppContext";
import styled from "styled-components";

import ModifyTweetButton from "./ModifyTweetButton";
import DeleteTweetButton from "./DeleteTweetButton";
import LikeTweetButton from "./LikeTweetButton";

const ProfilPicture = styled.img`
    border-radius: 50%;
    height: 40px;
    width: 40px;
`;

const Comment = ({comment, setMyComments }) => {
    const [myComment , setMyComment] = useState(comment)
    const { userid } = useContext(UserContext);

      
      
    return (
        <div className='card' style={{margin: "0px 0 10px 0px", borderRadius: "40px 10px 10px 10px"}}>

            <div className='card-header d-flex justify-content-between' style={{padding: "0"}}>
                <div className="left" style={{margin: "5px", paddingLeft: "15px"}}>
                    {myComment.picture ? (<ProfilPicture src={`/uploads/${myComment.userid}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                    <span style={{ marginLeft: "5px" }}>@{myComment.pseudo}</span>
                </div>
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

            <div className='card-body' style={{padding: "0"}}>
                <p className='card-text d-grid' 
                    style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", borderRadius: "10px", border: "border: 3px inset rgba(28,110,164,0.74)", padding: "0 5px 0 5px", margin: "7px 7px 7px 60px"}}>
                    {myComment.text}
                    <b>{myComment?.likers?.length} likes</b>
                </p>
            </div>

        </div>
    );
};

export default Comment;