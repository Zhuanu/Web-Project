import { Chat, Send } from "react-bootstrap-icons";
import { useState, useContext } from "react";
import { CommentContext } from "../AppContext";
import axios from "axios";

import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import CommentsWall from "./CommentsWall";
import { CustomDate } from "../Profil/MyTweetsDisplay";

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
            <div className='card' style={{borderRadius: "15px"}}>

                <div className='card-header d-flex'>
                    <div className="left">
                        {myTweet.picture ? (<ProfilPicture src={`/uploads/${myTweet.userid}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                        <span className="text-info" style={{ marginLeft: "15px" }}>@{myTweet.pseudo}</span>
                    </div>
                </div>

                <div className='card-body'>
                    <p className='card-text' 
                        style={{borderRadius: "10px", padding: "0 30px", fontSize: "1.15rem"}}
                    >{myTweet.content}</p>
                        <div className="d-flex text-secondary">
                            <p className="align-self-center" style={{marginRight: "5px", marginBottom: "0"}}>Last edited the</p>
                            <CustomDate customDate={myTweet.date} />
                        </div>
                        <div className="text-secondary">
                            <p style={{marginBottom: "0"}}><b>{myTweet?.likers?.length}</b> likes</p>
                            <p style={{marginBottom: "0"}}><b>{listComments.length}</b> comments</p>
                        </div>
                </div>
            </div>
        )
    };

    return (
        <div className="align-self-center">
            <label className='btn btn-link'>
                <Chat size={25} onClick={handleShowAlert} style={{cursor: "pointer"}} />
            </label>

            {showAlert && (
                <Modal show={showAlert} onHide={handleCloseAlert} size="lg" centered
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxHeight: '90%',
                    }}
                >
                    <Modal.Body className="row fenetre text-light" style={{margin: "0"}}>
                        <div className="tweetDisplay col align-self-center p-3">
                            <TweetDisplay />
                        </div>

                        <div className="col">
                            <CommentsWall myTweet={myTweet}/>
                            <div className="commentForm d-flex" style={{margin: "40px 10px 10px 10px"}}>
                                <textarea className='container-fluid' id="tweetContent" name="tweetContent" placeholder="What's happening ?" rows="2" 
                                    style={{resize: "none", borderRadius: "10px", border: "2px solid #ccc", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", padding: "10px", fontSize: "1rem", fontFamily: "sans-serif", width: "100%"}} value={text}
                                    onChange={(e) => {setText(e.target.value);
                                }}/>
                                <Send size={20} className="align-self-center" style={{marginLeft: "10px", cursor: "pointer"}} onClick={handleSendComment}></Send>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="footer">
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