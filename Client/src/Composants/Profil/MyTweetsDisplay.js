import { useContext, useEffect, useState } from "react";
import { UserContext } from "../AppContext";
import axios from "axios";
import styled from "styled-components";
import { CaretLeft, CaretDown } from "react-bootstrap-icons";

export const TweetPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

export const CommentPicture = styled.img`
    border-radius: 50%;
    height: 40px;
    width: 40px;
`;

export const CustomDate = ({ customDate }) => {
    const date = new Date(customDate);
    const month = date.toLocaleString('default', { month: 'short' }).toString();
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${day} ${month} ${year} at ${hours}:${minutes}`;

    return (<span style={{marginBottom: "0"}}>{formattedDate}</span>)
};

export const TweetDisplay = ({ tweet }) => {
    const [openComment, setOpenComment] = useState(false);

    return (
        <div>
            <div className='card' style={{borderRadius: "40px 40px 40px 40px", margin: "10px auto", width: "80%", opacity: "0.9"}}>
                <div className='card-header d-flex justify-content-between align-items-center'>
                    <div className="left align-items-center">
                        {tweet.picture ? (<TweetPicture src={`/uploads/${tweet.userid}.jpg`} alt='pp'/>) : (<TweetPicture src="/uploads/default.jpg" alt='pp'/>)}
                        <span style={{ margin: "0 20px 0 10px" }}>@{tweet.pseudo}</span>
                    </div>
                    <div className="right">
                        <span style={{ marginLeft: "5px" }}><CustomDate customDate={tweet.date}/></span>
                    </div>
                </div>
                <div className='card-body d-flex justify-content-between'>
                    <p className='card-text'
                        style={{borderRadius: "10px", padding: "0 40px", fontSize: "1.15rem"}}
                    >{tweet.content}</p>
                    {openComment ? (
                        <CaretDown size={25} className="align-self-end" style={{cursor: "pointer"}} onClick={() => {setOpenComment(false)}}/>) : (
                        <CaretLeft size={25} className="align-self-end" style={{cursor: "pointer"}} onClick={() => {setOpenComment(true)}}/>
                    )}
                </div>
            </div>

            {tweet.comments.length > 0 && openComment && (
                <div className="commentsWall" style={{padding: "10px", margin: "0 10% 0 15%", backdropFilter: "blur(10px)", borderRadius: "10px"}}>
                    {tweet.comments.map((comment) => {
                        return (<CommentDisplay key={comment._id} comment={comment}/>);
                    })}
                </div>
            )}
        </div>
    );
};

export const CommentDisplay = ({ comment }) => {

    return (
        <div className="border-top border-bottom" style={{borderRadius: "10px", margin: "10px 0"}}>
            <div className="left" style={{margin: "5px", paddingLeft: "15px"}}>
                {comment.picture ? (<CommentPicture src={`/uploads/${comment.userid}.jpg`} alt='pp'/>) : (<CommentPicture src="/uploads/default.jpg" alt='pp'/>)}
                <span style={{ marginLeft: "15px" }}>@{comment.pseudo}</span>
            </div>

            <div style={{margin: "0 20px 0 70px"}}>
                <p className='card-text d-grid' style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", borderRadius: "10px", padding: "4px"}}>{comment.text}</p>
                <p className="align-self-center" style={{marginRight: "20px", marginBottom: "0"}}>Last edited the <CustomDate customDate={comment.date} /></p>
            </div>
        </div>
    );
};

const MyTweetsDisplay = () => {
    const { profil } = useContext(UserContext);
    const [tweetOfUser, setTweetOfUser] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/messages/get/${profil}/tweet`,
            withCredentials: true,
        })
        .then((res) => {
            setTweetOfUser(res.data.tweetOfUser);
        })
        .catch((err) => {
            console.log(err)
        });
    }, [profil]);

    return (
        <div className="myTweetsDisplay d-grid"
            style={{
                maxHeight: "100vh",
                overflowY: "auto",
                gridGap: "10px",
            }}
        >
            {tweetOfUser.map((tweet) => {
                return (
                    <div key={tweet._id} className="" style={{maxHeight: "100vh", overflow: "auto"}}>
                        <TweetDisplay key={tweet._id} tweet={tweet} />
                    </div>
                );
            })}
        </div>

    );
};

export default MyTweetsDisplay;