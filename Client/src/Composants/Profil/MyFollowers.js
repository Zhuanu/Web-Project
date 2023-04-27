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

const MyFollowers = () => {
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/friend/followers",
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data)
            setFollowers(res.data.followers)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    const [followers, setFollowers] = useState([]);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {`${followers.length} followers`}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: '50%', margin: '0 auto' }}>followers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul>
                    {followers.map((follower) => (
                        <li key={follower.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FriendPicture src={`/uploads/${follower.id}.jpg`} alt={follower.id + "'s profil picture"} />
                            <p style={{ margin: '0 0 0 10px' }}>{follower.pseudo}</p>
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