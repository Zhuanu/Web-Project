import { useContext } from "react";
import { UserContext } from "../AppContext";
import { PersonDashFill } from "react-bootstrap-icons";
import axios from "axios";

const UnfollowButton = ({userId, list, setList, tweet}) => {
    const { setlistFollowing } = useContext(UserContext);

    const handleDeleteFollowing = () => {
        console.log(list)
        const updatedList = list.map((user) => {
            if (user?._id.toString() === userId.toString()) {
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
        setList(updatedList);
    };

    const handleDeleteForTweet = () => {
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
            ...tweet,
            isFollowed: false
        };
    };
    
    return (
        <button 
            className="btn btn-secondary d-flex align-items-center justify-content-center"
            style={{ borderRadius: "10px", height: "40px", width: "120px", fontSize: "1.1rem" }}
            onClick={() => {tweet ? (handleDeleteForTweet()) : (handleDeleteFollowing())}}
        >
            <PersonDashFill size={20} />
            <span style={{ marginLeft: "5px" }}>Suivi(e)</span>
        </button>

    );

};

export default UnfollowButton;