import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FriendPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: block;
`;

const Suggestions = ({setlistFollowing}) => {
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


    const handleFollow = (userId) => {
        const updatedList = listSuggestion.map(user => {
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
        setlistSuggestion(updatedList);
      };

    const handleDelete = (userId) => {
        const updatedList = listSuggestion.map(user => {
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
        setlistSuggestion(updatedList);
    };

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
                                        <FriendPicture src={`/uploads/${user?._id}.jpg`} alt="profil picture" />
                                    </div>
                                    <div className='col'>
                                        <p>@{user?.profil.pseudo}</p>
                                    </div>
                                    <div className='col'>
                                        {user?.isFollowed ? (
                                            <button onClick={() => {handleDelete(user._id)}}>Suivi(e)</button>
                                        ) : (
                                            <button onClick={() => {handleFollow(user._id)}}>Follow</button>
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