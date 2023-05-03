import { useContext, useState } from "react";
import { TweetContext, UserContext } from "../AppContext";
import axios from "axios";
import { Send, XCircle } from "react-bootstrap-icons";
import styled from "styled-components";

const FriendPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

const TweetForm = ({isInitialised}) => {
    const { setListTweet } = useContext(TweetContext);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState("");

    const handleSendTweet = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/messages',
            withCredentials: true,
            data: {
                content: message,
            }
        })
        .then((res) => {
            setListTweet(res.data.allTweets);
            setMessage("");
        })
        .catch((err) => {
            console.log(err)
        })
    };

    const handleCancel = () => {
        setMessage("");
    };

    return (

        !isInitialised ? (

            <div className="">
                <div className="d-flex align-items-center justify-content-center">
                    <strong>Loading...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>  
            </div>

        ) : (

            <div className='tweet-form'>
                <div className="card justify-content-center" style={{
                    margin: "10px 0 10px 0px",
                    borderRadius: "20px 20px 0px 20px",
                    paddingRight: "13px"
                }}>
                    <textarea className='' id="tweetContent" name="tweetContent" placeholder="What's happening ?" rows="3" 
                        style={{resize: "none", 
                        borderRadius: "10px 10px 0px 10px", 
                        border: "border: 3px inset rgba(28,110,164,0.74)", 
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)", 
                        padding: "10px", 
                        fontSize: "1rem", 
                        fontFamily: "sans-serif", 
                        margin: "10px 0 10px 15px",
                    }} 
                        value={message}
                        onChange={(e) => {setMessage(e.target.value);
                    }}/>
                </div>

                {
                    message ? (
                        <div className='card' style={{borderRadius: "40px 0px 0px 40px", margin: "10px 0 10px 0px"}}>
                            <div className='card-header'>
                                {user?.profil.picture ? <FriendPicture src={`/uploads/${user?._id}.jpg`} alt="pp"/> : <FriendPicture src={`/uploads/default.jpg`} alt="pp"/>}
                                <span style={{ marginLeft: "5px" }}>@{user?.profil.pseudo}</span>
                            </div>
                            <div className='card-body'>
                                <p className='card-text' style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", borderRadius: "10px", border: "border: 3px inset rgba(28,110,164,0.74)", padding: "0 5px 0 5px"}}>{message}</p>
                            </div>
                            <div className='card-footer>'>
                                <p className="" style={{ marginLeft: "15px"}}>Last edited {new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    ) : (null)
                }

                <div className='d-flex justify-content-end' style={{margin: "10px 0 10px 0"}}>
                    <button
                        className="btn btn-danger d-flex align-items-center justify-content-center"
                        style={{ borderRadius: "10px", height: "40px", width: "100px", fontSize: "1.1rem" }}
                        onClick={() => handleCancel()}
                    >
                        <XCircle size={20} />
                        <span style={{ marginLeft: "5px" }}>Cancel</span>
                    </button>
                    <button
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                        style={{ borderRadius: "10px 0px 10px 10px", height: "40px", width: "100px", fontSize: "1.1rem" }}
                        onClick={() => handleSendTweet()}
                    >
                        <Send size={20} />
                        <span style={{ marginLeft: "5px" }}>Tweet</span>
                    </button>
                </div>
            </div>

        )
    );
};

export default TweetForm;