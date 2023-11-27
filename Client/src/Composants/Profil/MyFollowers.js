import { useEffect, useState, useContext } from "react";
import { UserContext } from '../AppContext';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from "axios";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UnfollowButton from "./UnfollowButton";
import FollowButton from "./FollowButton";
import DeleteFollowerButton from "./DeleteFollowerButton";


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
    const { userid, profil, setProfil, listFollowing } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(false);
        const myProfil = userid === profil;

        myProfil ? (
            axios({
                method: "GET",
                url: "http://localhost:8000/api/friend/followers",
                withCredentials: true,
            })
            .then((res) => {
                setFollowers(res.data.followers);
            })
            .catch((err) => {
                console.log(err);
            })
        ) : (
            axios({
                method: "GET",
                url: `http://localhost:8000/api/friend/followers/${profil}`,
                withCredentials: true,
            })
            .then((res) => {
                const array = res.data.followers;
    
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
        );
    }, [profil, userid, listFollowing]);


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
        <div className="MyFollowers col p-0">
            {isLoading ? (
                <div className="d-flex align-items-center justify-content-center">
                    <strong>Loading...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>  
            ) : (
                <div className="followersWindow p-0 m-0">
                    <button className="btn btn-link text-info" onClick={handleShow} 
                        style={{cursor: "pointer", textDecoration: "none", fontSize: "20px"}}>
                        <b>{`${followers.length}`}</b> followers
                    </button>

                    <Modal show={show} backdrop onHide={handleClose} style={{position: "fixed", top: "100px", left: "50px"}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{width: '50%', margin: '0 auto' }}>followers</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <ul>
                            {followers.map((follower) => (
                                <li key={follower?._id} className="d-flex justify-content-between align-items-center m-2">

                                    <Link to={`/profil/${follower?._id}`} style={{textDecoration: "none"}} className="d-flex align-items-center" onClick={() => { handleRedirect(follower) }}>
                                        {follower?.profil.picture ? <FriendPicture src={`/uploads/${follower?._id}.jpg`} alt="pp"/> : <FriendPicture src={`/uploads/default.jpg`} alt="pp"/>}
                                        <span style={{ margin: "0 15px" }}>@{follower?.profil.pseudo}</span>
                                    </Link>

                                    {userid === profil && (<DeleteFollowerButton userId={follower._id} setList={setFollowers}/>)}
                                    {userid !== profil && follower?.isFollowed && (<UnfollowButton userId={follower._id} list={followers} setList={setFollowers} />)}
                                    {userid !== profil && !follower?.isFollowed && userid !== follower?._id && (<FollowButton userId={follower._id} list={followers} setList={setFollowers} />)}

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
    </div>
  );
};

export default MyFollowers;