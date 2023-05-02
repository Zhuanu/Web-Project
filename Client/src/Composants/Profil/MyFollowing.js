import { useEffect, useState, useContext } from "react";
import { UserContext } from '../AppContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import axios from "axios";
import UnfollowButton from "./UnfollowButton";
import FollowButton from "./FollowButton";


const FriendPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: block;
`;

const MyFollowing = ({ setFriend }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [following, setFollowing] = useState([]);
    const [show, setShow] = useState(false);
    const { userid, profil, setProfil, listFollowing } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(false);
        const me = userid === profil;
        const url = me 
        ? "http://localhost:8000/api/friend/following" 
        : `http://localhost:8000/api/friend/following/${profil}`
        axios({
            method: "GET",
            url: url,
            withCredentials: true,
        })
        .then((res) => {
            const array = res.data.following;
            const updatedArray = array.map((user) => {
                const isFollowed = listFollowing.some((follow) => {
                    return follow._id.toString() === user._id.toString();
                });
                return {
                    ...user,
                    isFollowed: isFollowed
                };
            });
            setFollowing(updatedArray)
        });
    }, [profil, userid, listFollowing]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRedirect = (user) => {
        setProfil(user._id);
        setFriend(user)
        handleClose();
    };

    return (
        <>
            {isLoading ? (
                <div>
                    <div className="d-flex align-items-center justify-content-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>  
                </div>
            ) : (
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        <b>{`${following.length}`}</b> following
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ width: '50%', margin: '0 auto' }}>following</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <ul>
                            {following.map((f) => (
                                <li key={f._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Link to={`/profil/${f._id}`} style={{ display: 'flex', alignItems: 'center' }} onClick={() => { handleRedirect(f) }}>
                                        {f.profil.picture ? <FriendPicture src={`/uploads/${f._id}.jpg`} alt="pp"/> : <FriendPicture src={`/uploads/default.jpg`} alt="pp"/>}
                                        <p style={{ margin: '0 0 0 10px' }}>{f.profil.pseudo}</p>
                                        <p>{f.isFollowed + ""}</p>
                                    </Link>

                                        {f?.isFollowed 
                                        ? <UnfollowButton userId={f._id} list={following} setList={setFollowing} />
                                        : userid !== f?._id && <FollowButton userId={f._id} list={following} setList={setFollowing} />}

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
            </div>)}
        </>
  );
};

export default MyFollowing;