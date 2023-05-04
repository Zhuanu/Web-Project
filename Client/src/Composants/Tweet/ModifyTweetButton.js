import { useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModifyTweetButton = ({ myTweet, setMyTweet, myComment, setMyComment }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [tweetContent, setTweetContent] = useState("");

    const handleClickModifyButton = () => {
        setShowAlert(true);
    };

    const handleClickConfirmModifyButton = () => {
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/messages/`,
            data: {
                tweetId: myTweet._id,
                content: tweetContent
            },
            withCredentials: true,
        })
        .then((res) => {
            setMyTweet(res.data.newTweet);
            handleCloseAlert();
        })
        .catch((err) => {
            console.log(err)
        });
    }

    const handleCommentModified = () => {
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/messages/comment`,
            data: {
                commentid: myComment._id,
                text: tweetContent
            },
            withCredentials: true,
        })
        .then((res) => {
            setMyComment(res.data.modifiedComment);
            handleCloseAlert();
        })
        .catch((err) => {
            console.log(err)
        });
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
        setTweetContent("");
    };

    return (
        <div className='modify'>
            <label className='btn btn-link'>
                <PencilSquare size={20} onClick={handleClickModifyButton} style={{cursor: "pointer"}}/>
            </label>
            {showAlert && (
                <Modal show={showAlert} onHide={handleCloseAlert}>
                    <Modal.Body>
                        <textarea className='container-fluid' id="tweetContent" name="tweetContent" placeholder="What's happening ?" rows="3" 
                            style={{resize: "none", borderRadius: "10px", border: "2px solid #ccc", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", padding: "10px", fontSize: "1rem", fontFamily: "sans-serif", height: "150px", width: "100%"}} value={tweetContent}
                            onChange={(e) => {setTweetContent(e.target.value);
                        }}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseAlert}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={myTweet ? (handleClickConfirmModifyButton) : (handleCommentModified)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ModifyTweetButton;