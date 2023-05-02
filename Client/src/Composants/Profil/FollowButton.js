import { useContext } from "react";
import { UserContext } from "../AppContext";
import { PersonPlusFill } from "react-bootstrap-icons";
import axios from "axios";

const FollowButton = ({userId, list, setList}) => {
    const { setlistFollowing } = useContext(UserContext);

    const handleFollow = () => {
        console.log(list)
        const updatedList = list.map(user => {
            if (user?._id.toString() === userId.toString()) {
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
        setList(updatedList);
    };

    return (
        <button 
            className="btn btn-success d-flex align-items-center justify-content-center"
            style={{ borderRadius: "10px", height: "40px", width: "120px", fontSize: "1.1rem" }}
            onClick={() => handleFollow()}
        >
            <PersonPlusFill size={20} />
            <span style={{ marginLeft: "5px" }}>Follow</span>
        </button>
    );

};

export default FollowButton;