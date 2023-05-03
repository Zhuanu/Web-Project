import { ChatText, Send } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
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
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/messages/comment/${myTweet._id}`,
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data)
            setComments(res.data.commentsFromTweet);
            console.log("print dans COmmentTweetButton", res.data.commentsFromTweet);
            setMyTweet({...myTweet, comments: res.data.commentsFromTweet})
        })
        .catch((err) => {
            console.log(err)
        });
    }, [myTweet._id]);

    const handleClickCommentButton = () => {
        setShowAlert(true);
    };

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
        })
        .then((res) => {
            console.log(res.data)
            setComments(res.data.commentsFromTweet);
            setMyTweet({...myTweet, comments: res.data.commentsFromTweet})
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
                    <p className="" 
                        style={{ margin: "5px 15px 0 15px", borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}}>
                        Last edited {new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString()} 
                        <br/>
                        {myTweet?.likers?.length} likes
                    </p>
                </div>
            </div>
        )
    };

    return (
        <div className="comment">

            <label className='btn btn-link'>
                <ChatText size={20} onClick={handleClickCommentButton} style={{cursor: "pointer"}} />
            </label>

            {showAlert && (
                <Modal show={showAlert} onHide={handleCloseAlert} size="lg">
                    <Modal.Body className="row">
                        <div className="tweetDisplay col d-flex align-items-center" >
                            <TweetDisplay />
                        </div>
                        
                        <div className="commentDisplay col">
                            <CommentsWall comments={comments} />
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
};

export default CommentTweetButton;