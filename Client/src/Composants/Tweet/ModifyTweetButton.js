import { useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModifyTweetButton = ({ myTweet, setMyTweet }) => {
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
                        <textarea className='container-fluid' id="tweetContent" name="tweetContent" placeholder="What's happening ?" rows="3" style={{resize: "none", borderRadius: "10%", }} value={tweetContent}
                            onChange={(e) => {setTweetContent(e.target.value);
                        }}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseAlert}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClickConfirmModifyButton}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ModifyTweetButton;