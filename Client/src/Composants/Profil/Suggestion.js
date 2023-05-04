import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';

const FriendPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: block;
`;

const Suggestions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [listSuggestion, setlistSuggestion] = useState([]);

    useEffect(() => {
        setIsLoading(false);
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/user/infos',
            withCredentials: true,
        })
        .then((res) => {
            const array = res.data.users;
            array.sort(() => 0.5 - Math.random())
            setlistSuggestion(array);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className='suggestions'>
            <h3 className='text-center' style={{marginBottom: "15px"}}>Suggestions</h3>
            {isLoading ? (
                <div>
                    <div className="d-flex align-items-center justify-content-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>  
                </div>
            ) : (
                <ul className='list-unstyled'>
                    {listSuggestion && listSuggestion.slice(0, 4).map((user) => {
                        return (
                            <li key={user?._id} style={{margin: "10px 0 10px 0"}}>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center'>
                                        {user?.profil.picture ? <FriendPicture src={`/uploads/${user._id}.jpg`} alt="pp"/> : <FriendPicture src={`/uploads/default.jpg`} alt="pp"/>}
                                        <span style={{margin: "0 10px 0 10px"}}>@{user?.profil.pseudo}</span>
                                    </div>

                                    <div className="">
                                        {user?.isFollowed ? (
                                            <UnfollowButton userId={user?._id} list={listSuggestion} setList={setlistSuggestion} />
                                        ) : (
                                            <FollowButton userId={user?._id} list={listSuggestion} setList={setlistSuggestion} />
                                        )}
                                    </div>

                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default Suggestions;