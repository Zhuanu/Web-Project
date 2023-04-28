import { useEffect, useState } from "react";
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

const MyFollowing = () => {

    useEffect(() => handleDisplay(), [])

    const handleDisplay = () => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/friend/following",
            withCredentials: true,
        })
        .then((res) => {
            setFollowing(res.data.following)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const handleDelete = (id) => {
        axios({
            method: "DELETE",
            url: `http://localhost:8000/api/friend/following/${id}`,
            withCredentials: true,
        })
        .then((res) => {
            handleDisplay()
        })
        .catch((err) => {
            console.log(err)
        })
    }


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
                    <Modal.Title style={{ width: '50%', margin: '0 auto' }}>following</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul>
                    {following.map((f) => (
                        <li key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FriendPicture src={`/uploads/${f.id}.jpg`} alt={f.id + "'s profil picture"} />
                            <p style={{ margin: '0 0 0 10px' }}>{f.pseudo}</p>
                        </div>
                        <button onClick={() => {handleDelete(f.id)}}>Delete</button>
                        </li>
                    ))}
                </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
  );
};

export default MyFollowing;