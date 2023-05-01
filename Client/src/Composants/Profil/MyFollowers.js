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

const MyFollowers = ({ setFriend }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [followers, setFollowers] = useState([]);
    const [show, setShow] = useState(false);
    const { userid, profil, setProfil, listFollowing, setlistFollowing } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(false);
        const me = userid === profil;
        const url = me 
        ? "http://localhost:8000/api/friend/followers" 
        : `http://localhost:8000/api/friend/followers/${profil}`

        axios({
            method: "GET",
            url: url,
            withCredentials: true,
        })
        .then((res) => {
            const array = res.data.followers;
            console.log("fjakzljfzlkajf",listFollowing)
            const updatedArray = array.map((user) => {
                const isFollowed = listFollowing.some((follow) => {
                    return follow._id.toString() === user._id.toString();
                });
                return {
                    ...user,
                    isFollowed: isFollowed
                };
            });
            setFollowers(updatedArray)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [profil, userid, listFollowing]);

    const handleDeleteFollowers = (id) => {
        axios({
            method: "DELETE",
            url: `http://localhost:8000/api/friend/followers/${id}`,
            withCredentials: true,
        })
        .then((res) => {
            setFollowers(res.data.followers)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleDeleteFollowing = (userId) => {
        const updatedList = followers.map(user => {
            if (user._id.toString() === userId.toString()) {
                axios({
                    method: "DELETE",
                    url: `http://localhost:8000/api/friend/following/${userId}`,
                    withCredentials: true,
                })
                .then((res) => {
                    setlistFollowing(res.data.following)
                })
                .catch((err) => {
                    console.log(err)
                })
                return {
                    ...user,
                    isFollowed: false
                };
            } else {
                return user;
            }
        });
        setFollowers(updatedList);
    };


    const handleFollow = (userId) => {
        const updatedList = followers.map(user => {
            if (user._id.toString() === userId.toString()) {
                axios({
                    method: "POST",
                    url: `http://localhost:8000/api/friend/following/${userId}`,
                    withCredentials: true,
                })
                .then((res) => {
                    setlistFollowing(res.data.following)
                })
                .catch((err) => {
                    console.log(err)
                })
                return {
                    ...user,
                    isFollowed: true
                };

            } else {
                return user;
            }
        });
        setFollowers(updatedList);
    };


    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleRedirect = (user) => {
        setFriend(user);
        setProfil(user._id);
        handleClose();
    }

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
                <div className="followersWindow">
                    <Button variant="primary" onClick={handleShow}>
                        <b>{`${followers.length}`}</b> followers
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ width: '50%', margin: '0 auto' }}>followers</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <ul>
                            {followers.map((follower) => (
                                <li key={follower?._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link to={`/profil/${follower?._id}`} style={{ display: 'flex', alignItems: 'center' }} onClick={() => { handleRedirect(follower) }}>
                                    {follower?.profil.picture ? <FriendPicture src={`/uploads/${follower?._id}.jpg`} alt="pp"/> : <FriendPicture src={`/uploads/default.jpg`} alt="pp"/>}
                                    <p style={{ margin: '0 0 0 10px' }}>{follower?.profil.pseudo}</p>
                                    <p>{follower.isFollowed + ""}</p>
                                </Link>

                                {userid === profil && (<button className="btn btn-danger" onClick={() => {handleDeleteFollowers(follower?._id)}}>Delete</button>)}
                                {userid !== profil && follower?.isFollowed && (<button className="btn btn-secondary" onClick={() => {handleDeleteFollowing(follower?._id)}}>Suivi(e)</button>)}
                                {userid !== profil && !follower?.isFollowed && userid !== follower?._id && (<button className="btn btn-success" onClick={() => {handleFollow(follower?._id)}}>Follow</button>)}

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

export default MyFollowers;