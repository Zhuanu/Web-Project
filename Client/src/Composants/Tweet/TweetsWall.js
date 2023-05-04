import { TweetContext } from "../AppContext";
import { useContext } from "react";

import Tweet from "./Tweet";

const TweetsWall = () => {
    const { listTweet } = useContext(TweetContext);

    return (
        <div className="tweets-wall" style={{maxHeight: "calc(80vh - 90px)", overflowY: "auto"}}>
            {listTweet.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </div>

    );
};

export default TweetsWall;