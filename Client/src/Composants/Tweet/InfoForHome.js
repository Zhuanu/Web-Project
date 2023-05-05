import { useContext, useEffect, useState } from "react";
import { TweetContext, UserContext } from "../AppContext";
import axios from "axios";

const InfoForHome = () => {
    const { listTweet } = useContext(TweetContext);
    const { listFollowing } = useContext(UserContext);
    const [listFollowers, setListFollowers] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/friend/followers`,
            withCredentials: true,
        })
        .then((res) => {
            setListFollowers(res.data.followers)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])


    return (
        <div className="infoForHome" style={{marginTop: "25%", backdropFilter: "blur(10px)"}}>
            <div className="body d-grid border p-4" style={{marginBottom: "30px", borderRadius: "10px"}}>
                <span style={{marginBottom: "10px"}}><b>{listTweet.length}</b> tweets au total !</span>
                <span style={{marginBottom: "10px"}}><b>{listFollowing.length}</b> abonnements !</span>
                <span style={{}}><b>{listFollowers.length}</b> abonné(e)s !</span>
            </div>

            <div className="footer d-grid" style={{marginTop: "10px"}}>
                <p className="text-break" style={{marginBottom: "10px"}}>À propos Aide Presse API Emplois Confidentialité Conditions Lieux Langue</p>
                <span>© 2023 ALL BY ME</span>
            </div>
        </div>
    );
};

export default InfoForHome;