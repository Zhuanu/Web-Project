import { useState, useContext } from 'react';
import { TweetContext, CommentContext } from '../AppContext';
import { Trash3 } from 'react-bootstrap-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteTweetButton = ({ myTweet, myComment }) => {
    const [showAlert, setShowAlert] = useState(false);
    const { setListTweet } = useContext(TweetContext);
    const { setListComments } = useContext(CommentContext);

    const handleClickDeleteButton = () => {
        setShowAlert(true);
    };

    const handleClickConfirmDeleteButton = () => {
        axios({
            method: 'DELETE',
            url: `http://localhost:8000/api/messages/`,
            data: {
                tweetId: myTweet._id
            },
            withCredentials: true,
        })
        .then((res) => {
            setListTweet(res.data.allTweets);
            handleCloseAlert();
        })
    }

    const handleCommentDeleted = () => {
        axios({
            method: 'DELETE',
            url: `http://localhost:8000/api/messages/comment`,
            data: {
                commentid: myComment._id,
                tweetid: myComment.tweetid
            },
            withCredentials: true,
        })
        .then((res) => {
            setListComments(res.data.commentsFromTweet);
            handleCloseAlert();
        })
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className='delete align-self-center'>
            <label className='btn btn-link'>
                <Trash3 size={25} onClick={handleClickDeleteButton} style={{cursor: "pointer"}}/>
            </label>
            {showAlert && (
                <Modal show={showAlert} onHide={handleCloseAlert}
                    style={{
                        position: 'fixed',
                        top: '75%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Modal.Body>
                        <p className='text-center'>Are you sure you want to delete this?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseAlert}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={myTweet ? (handleClickConfirmDeleteButton) : (handleCommentDeleted)}>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default DeleteTweetButton;