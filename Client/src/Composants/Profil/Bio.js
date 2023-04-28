import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../AppContext';

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
//   align-items: center;
  margin-bottom: 20px;
`;

const Bio = () => {
    const [bio, setBio] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const { profil, userid } = useContext(UserContext);
    

    useEffect(() => {
        const me = userid === profil;
        const url = me
        ? "http://localhost:8000/api/user/get"
        : `http://localhost:8000/api/friend/profil/${window.location.href.split('/')[4]}`
        
        axios({
            method: "GET",
            url: url,
            withCredentials: true,
        })
        .then((res) => {
            setCreationDate(res.data.profil.creationDate)
            setBio(res.data.profil.bio)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [profil, userid]);

    return (
        <DescriptionContainer>
            <p>Member since {creationDate}</p>
            <p>Bio: {bio}</p>
        </DescriptionContainer>
    );
}

export default Bio;