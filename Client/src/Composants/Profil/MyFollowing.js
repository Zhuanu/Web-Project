import { useEffect, useState, useContext } from "react";
import { UserContext } from '../AppContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import axios from "axios";


const FriendPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: block;
`;

const MyFollowing = () => {
    const [following, setFollowing] = useState([]);
    const [original, setOriginal] = useState([]);
    const [show, setShow] = useState(false);
    const { userid, profil, setProfil } = useContext(UserContext);

    useEffect(() => handleDisplay(), [profil])
    useEffect(() => handleFollowing(), []);

    const handleFollowing = () => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/friend/following",
            withCredentials: true,
        })
        .then((res) => {
            setOriginal(res.data.following)
        })
        .catch((err) => {
            console.log(err)
        })
     }

    const handleDisplay = () => {
        const me = userid === profil;
        const url = me
        ? "http://localhost:8000/api/friend/following"
        : `http://localhost:8000/api/friend/following/${window.location.href.split('/')[4]}`

        axios({
            method: "GET",
            url: url,
            withCredentials: true,
        })
        .then((res) => {
            setFollowing(res.data.following)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleDeleteFollowing = (id) => {
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

    const handleFriend = (id) => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/friend/profil/${id}`,
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data)
            console.log(original, "fjekaljfkleajfkleajflaekflkae")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleAdd = (id) => {
        axios({
            method: "POST",
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

    const appartient = (id) => {
        for (let i = 0; i < original.length; i++) {
            if (JSON.stringify(original[i]) === JSON.stringify(id)) {
                return true
            }
        }
        return false
    }

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
                        <Link to={`/profil/${f.id}`} style={{ display: 'flex', alignItems: 'center' }} onClick={() => { handleFriend(f.id); setProfil(f.id) }}>
                            <FriendPicture src={`/uploads/${f.id}.jpg`} alt={f.id + "'s profil picture"} />
                            <p style={{ margin: '0 0 0 10px' }}>{f.pseudo}</p>
                        </Link>
                        
                        {userid === profil && (<button className="btn btn-secondary" onClick={() => {handleDeleteFollowing(f.id)}}>Suivi(e)</button>)}
                        {userid !== profil && appartient(f) && (<button className="btn btn-secondary" onClick={() => {handleDeleteFollowing(f.id)}}>Suivi(e)</button>)}
                        {userid !== profil && !appartient(f) && userid !== f.id && (<button className="btn btn-success" onClick={() => {handleAdd(f.id)}}>Follow</button>)}

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