import { PersonDashFill } from "react-bootstrap-icons";
import { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteFollowerButton = ({userId, setList}) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleDeleteFollower = () => {
        axios({
            method: "DELETE",
            url: `http://localhost:8000/api/friend/followers/${userId}`,
            withCredentials: true,
        })
        .then((res) => {
            setList(res.data.followers);
            handleCloseAlert();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleClickDeleteButton = () => {
        setShowAlert(true);
    };

    return (
        <div>
            <button
                className="btn btn-danger d-flex align-items-center justify-content-center"
                style={{ borderRadius: "10px", height: "40px", width: "120px", fontSize: "1.1rem" }}
                onClick={() => handleClickDeleteButton()}
            >
                <PersonDashFill size={20} />
                <span style={{ marginLeft: "5px" }}>Delete</span>
            </button>

            {showAlert && (
                <Modal show={showAlert} onHide={handleCloseAlert}>
                    <Modal.Body>
                        <p className='text-center'>Are you sure you want to delete this follower?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseAlert}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleDeleteFollower}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

        </div>
    );
};

export default DeleteFollowerButton;