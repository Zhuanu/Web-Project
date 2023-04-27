import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import axios from "axios";


const FriendPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: block;
`;

const MyFollowers = () => {

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/friend/following",
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data)
            setFollowing(res.data.following)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    const [following, setFollowing] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {`${following.length} following`}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>following</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul>
                    {following.map((f) => (
                        <li key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FriendPicture src={`/uploads/${f.id}.jpg`} alt={f.id + "'s profil picture"} />
                            <p style={{ margin: '0 0 0 10px' }}>{f.pseudo}</p>
                        </div>
                        <button>Retirer</button>
                        </li>
                    ))}
                </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
  );
};

export default MyFollowers;