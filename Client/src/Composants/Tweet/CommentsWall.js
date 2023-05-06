import Comment from "./Comment";
import { useContext, useEffect } from "react";
import { CommentContext } from "../AppContext";
import axios from "axios";

const CommentsWall = ({ myTweet }) => {
    const { listComments, setListComments } = useContext(CommentContext);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/messages/comment/${myTweet._id}`,
            withCredentials: true,
        })
        .then((res) => {
            setListComments(res.data.commentsFromTweet);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [myTweet, setListComments]);

    return (
        <div className="comments-wall" style={{maxHeight: "55vh", overflowY: "auto", borderRadius: "10px"}}>
            {listComments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsWall;