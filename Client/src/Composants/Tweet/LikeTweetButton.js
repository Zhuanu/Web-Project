import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../AppContext';
import { HeartFill } from 'react-bootstrap-icons';

const LikeTweetButton = ({ myTweet, setMyTweet, myComment, setMyComment }) => {
    const [likers, setLikers] = useState([]);
    const [liked, setLiked] = useState();
    const [isLikersInitialised, setIsLikersInitialised] = useState(false);

    const { userid } = useContext(UserContext);

    const myTweetExist = myTweet ? true : false;
    const thing = (myTweetExist ? myTweet : myComment)

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/messages/like/${thing._id}`,
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data)
            setLikers(res.data.listUsers);
            myTweetExist ? (setMyTweet({...thing, likers: res.data.listUsers})) : (setMyComment({...thing, likers: res.data.listUsers}))
        })
        .catch((err) => {
            console.log(err)
        });
    }, [thing._id]);


    useEffect(() => {
        const isLiked = likers.includes(userid);
        if (isLiked) {
            setLiked(true);
        } else {
            setLiked(false);
        }
        setIsLikersInitialised(true);
    }, [likers, userid]);


    const handleClickLikeButton = () => {
        axios({
            method: `${liked ? 'DELETE' : 'POST'}`,
            url: `http://localhost:8000/api/messages/like`,
            data: {
                tweetId: thing._id
            },
            withCredentials: true,
        })
        .then((res) => {
            setLikers(res.data.listUsers);
            myTweetExist ? (setMyTweet({...thing, likers: res.data.listUsers})) : (setMyComment({...thing, likers: res.data.listUsers}))
            setLiked(res.data.state)
        })
        .catch((err) => {
            console.log(err)
        })
        
    };

    return (
        isLikersInitialised ? (
            <div className='like'>
                <label className='btn btn-link'>
                    <HeartFill size={20} color={liked ? "red" : `${null}`} onClick={handleClickLikeButton} style={{cursor: "pointer"}} />
                </label>
            </div>

        ) : (

            <div>
                <div className="d-flex align-items-center justify-content-center">
                    <strong>Loading...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>  
            </div>

        )
    );
};

export default LikeTweetButton;