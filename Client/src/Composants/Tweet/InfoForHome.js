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
        <div className="infoForHome" style={{marginTop: "25%"}}>
            <div className="body d-grid" style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", textAlign: "center", marginBottom: "10px"}}>
                <span style={{marginBottom: "10px"}}><b>{listTweet.length}</b> tweets au total !</span>
                <span style={{marginBottom: "10px"}}><b>{listFollowing.length}</b> abonnements !</span>
                <span style={{marginBottom: "10px"}}><b>{listFollowers.length}</b> abonné(e)s !</span>
            </div>

            <div className="footer d-grid" style={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", marginTop: "10px"}}>
                <p className="text-break" style={{marginBottom: "10px"}}>À propos Aide Presse API Emplois Confidentialité Conditions Lieux Langue</p>
                <span>© 2023 ALL BY ME</span>
            </div>
        </div>
    );
};

export default InfoForHome;