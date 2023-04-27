import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
//   align-items: center;
  margin-bottom: 20px;
`;

// export const DescriptionInput = styled.input`
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   width: 100%;
//   max-width: 400px;
// `;

// export const DescriptionButton = styled.button`
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: all 0.3s ease;
  
//   &:hover {
//     background-color: #0069d9;
//   }
// `;


const Bio = () => {
    const [bio, setBio] = useState('')
    const [creationDate, setCreationDate] = useState('')
    

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/user/get",
            withCredentials: true,
        })
        .then((res) => {
            setCreationDate(res.data.profil.creationDate)
            setBio(res.data.profil.bio)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <DescriptionContainer>
            <p>Member since {creationDate}</p>
            <p>Bio: {bio}</p>
        </DescriptionContainer>
    );
}

export default Bio;