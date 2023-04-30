import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image } from 'react-bootstrap-icons';
import { displayDate } from './dateUtils';





const FriendPicture = styled.img`
    border-radius: 40%;
    height: 70px;
    width: 70px;
    display: block;
`;

const ImageInsert = styled.img`
    height: 300px;
    width: 400px;
    display: block;
`;



const NewTweetForm = ({user, listFollowing}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [picture, setPicture] = useState("");
    const [file, setFile] = useState("");
    // const [listTweet, setListTweet] = useState([]);

    const handlePicture = (e) => {

    };

    const handleSendTweet = () => {

    }

    const handleCancel = () => {
        setTweet("");
        setPicture("");
        setFile("");
        setIsLoading(false);
    }

    return (
        <div className='tweet-form'>
            {isLoading ? (
                <div className="">
                    <div className="d-flex align-items-center justify-content-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>  
                </div>

            ) : (
                <div className="container bg-light mx-auto d-block border" style={{width:"400px"}}>
                    <h2 className='text-center'>Tweet</h2>
                    <div className="d-flex justify-content-between mx-auto p-2" >
                        <p><span className='fw-bold'>{user?.profil.followers.length + ""}</span> followers</p>
                        <Link to="/profil">
                            <FriendPicture src={`/uploads/${user?._id}.jpg`} alt="profil picture" />
                        </Link>
                        <p><span className='fw-bold'>{listFollowing?.length + ""}</span> following</p>
                    </div>

                    <div className="d-flex row justify-content-center">
                        <textarea rows='5' name='tweet' id='tweet' placeholder="What's happening ?" value={tweet} onChange={(e) => {setTweet(e.target.value)}}/>
                        { picture || tweet ? (
                            <ul className="card-group list-unstyled bg-warning position-relative">
                                <div className="card text-center">
                                    <div className="card-header d-flex align-items-center">
                                        <FriendPicture src={`/uploads/${user?._id}.jpg`} alt="profil picture" />
                                        <p className='ms-3 mb-0'>@{user?.profil.pseudo}</p>
                                        <p style={{paddingLeft:"120px"}}>{displayDate()}</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{tweet}</p>
                                        {picture && (
                                            <ImageInsert src={picture} alt="picture" />
                                        )}
                                    </div>
                                </div>
                            </ul>
                        ) : null}
                    </div>

                    <div className="row position-relative container">

                        <div className='icon'>
                            { !picture && (
                            <>
                                <label htmlFor="file-upload">
                                    <Image size={30}/>
                                </label>
                                <input className="invisible" type="file" id="file-upload" accept=".jpg" onChange={(e) => {handlePicture(e)}}/>
                            </>
                            )}
                        </div>

                        <li className='card-footer tweet d-flex justify-content-end position-absolute top-0 end-0'>
                            <button className='btn btn-danger' onClick={() => {handleCancel()}}>Cancel</button>
                            <button className='btn btn-primary' onClick={() => {handleSendTweet()}}>Tweet</button>
                        </li>

                    </div>
                </div>
            )}
        </div>
    );
};

export default NewTweetForm;