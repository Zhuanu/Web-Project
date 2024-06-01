import { TweetContext } from "../AppContext";
import { useContext } from "react";

import Tweet from "./Tweet";

const TweetsWall = () => {
    const { listTweet } = useContext(TweetContext);

    return (
        <div className="tweets-wall" style={{maxHeight: "37vh", overflowY: "auto", marginTop: "4%"}}>
            {listTweet.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </div>

    );
};

export default TweetsWall;