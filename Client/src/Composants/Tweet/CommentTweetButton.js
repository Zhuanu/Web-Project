import { ChatText, Send } from "react-bootstrap-icons";
import { useState, useContext } from "react";
import { CommentContext } from "../AppContext";
import axios from "axios";

import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import CommentsWall from "./CommentsWall";

const ProfilPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;


const CommentTweetButton = ({ myTweet, setMyTweet }) => {
    const [showAlert, setShowAlert] = useState(false);
    const { listComments, setListComments } = useContext(CommentContext);
    const [text, setText] = useState("");

    const handleShowAlert = () => setShowAlert(true);

    const handleCloseAlert = () => {
        setShowAlert(false);
        setText("");
    };

    const handleSendComment = () => {
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/messages/comment`,
            data: {
                text: text,
                tweetid: myTweet._id
            },
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data)
            setListComments(res.data.commentsFromTweet);
            setMyTweet({...myTweet, comments: res.data.commentsFromTweet})
            setText("");
        })
        .catch((err) => {
            console.log(err)
        });
    };

    const TweetDisplay = () => {
        return (
            <div className='card' style={{borderRadius: "40px 40px 40px 40px", margin: "10px 0 10px 0px"}}>

                <div className='card-header d-flex'>
                    <div className="left">
                        {myTweet.picture ? (<ProfilPicture src={`/uploads/${myTweet.userid}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                        <span style={{ marginLeft: "5px" }}>@{myTweet.pseudo}</span>
                    </div>
                </div>

                <div className='card-body'>
                    <p className='card-text' style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", borderRadius: "10px", border: "border: 3px inset rgba(28,110,164,0.74)", padding: "0 5px 0 5px"}}>{myTweet.content}</p>
                    <div style={{borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}}>
                        <p style={{margin: "0"}}>
                            Last edited {new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString()} 
                        </p>
                        <div className="d-flex justify-content-between">
                            <span><b>{myTweet?.likers?.length}</b> likes</span>
                            <span><b>{listComments.length}</b> comments</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="">
            <label className='btn btn-link'>
                <ChatText size={20} onClick={handleShowAlert} style={{cursor: "pointer"}} />
            </label>

            {showAlert && (
                <Modal show={showAlert} onHide={handleCloseAlert} size="lg">
                    <Modal.Body className="row">
                        <div className="tweetDisplay col d-flex align-items-center" >
                            <TweetDisplay />
                        </div>

                        <div className="col">
                            <CommentsWall myTweet={myTweet}/>
                            <div className="commentForm d-flex">
                                <textarea className='container-fluid' id="tweetContent" name="tweetContent" placeholder="What's happening ?" rows="2" 
                                    style={{resize: "none", borderRadius: "10px", border: "2px solid #ccc", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", padding: "10px", fontSize: "1rem", fontFamily: "sans-serif", width: "100%"}} value={text}
                                    onChange={(e) => {setText(e.target.value);
                                }}/>
                                <Send size={20} className="align-self-center" style={{marginLeft: "10px", cursor: "pointer"}} onClick={handleSendComment}></Send>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseAlert}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

        </div>
    );
}

export default CommentTweetButton;