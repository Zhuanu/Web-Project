import Comment from "./Comment";
import { useState } from "react";

const CommentsWall = ({ comments }) => {
    const [myComments, setMyComments] = useState(comments)
    return (
        <div className="comments-wall">
            {myComments.map((comment) => (
                <Comment key={comment._id} comment={comment} setMyComments={setMyComments} />
            ))}
        </div>
    );
};

export default CommentsWall;