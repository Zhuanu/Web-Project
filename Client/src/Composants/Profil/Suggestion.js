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
        <div className='suggestions bg-light'>
            <h2 className='text-center'>Suggestions</h2>
            {isLoading ? (
                <div>
                    <div className="d-flex align-items-center justify-content-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>  
                </div>
            ) : (
                <ul className='list-unstyled'>
                    {listSuggestion && listSuggestion.slice(0, 5).map((user) => {
                        return (
                            <li key={user?._id}>
                                <div className='row'>
                                    <div className='col'>
                                        {user?.profil.picture ? <FriendPicture src={`/uploads/${user._id}.jpg`} alt="pp"/> : <FriendPicture src={`/uploads/default.jpg`} alt="pp"/>}
                                    </div>
                                    <div className='col'>
                                        <p>@{user?.profil.pseudo}</p>
                                        <p>{user?.isFollowed + ""}</p>
                                    </div>
                                    <div className='col'>
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