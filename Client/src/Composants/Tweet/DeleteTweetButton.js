import { useState, useContext } from 'react';
import { TweetContext } from '../AppContext';
import { Trash3 } from 'react-bootstrap-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteTweetButton = ({ myTweet }) => {
    const [showAlert, setShowAlert] = useState(false);
    const { setListTweet } = useContext(TweetContext);

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

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className='delete'>
            <label className='btn btn-link'>
                <Trash3 size={20} onClick={handleClickDeleteButton} style={{cursor: "pointer"}}/>
            </label>
            {showAlert && (
                <Modal show={showAlert} onHide={handleCloseAlert}>
                    <Modal.Body>
                        <p className='text-center'>Are you sure you want to delete this tweet?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClickConfirmDeleteButton}>
                            Supprimer
                        </Button>
                        <Button variant="danger" onClick={handleCloseAlert}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default DeleteTweetButton;