import { useContext, useState, useEffect } from "react";
import { UserContext } from "../AppContext";
import styled from 'styled-components';
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ProfilPictureCss = styled.img`
    border-radius: 50%;
    height: 100px;
    width: 100px;
    display: block;
`;

const DropZoneWrapper = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    margin: 20px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
`;

// i want the element in the container to be centered
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfilPicture = () => {

    const [username, setUsername] = useState('');

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/user/get",
            withCredentials: true,
        })
        .then((res) => {
            setUsername(res.data.profil.pseudo)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    const handleDropzoneSubmit = async (acceptedFiles) => {
        const formData = new FormData();
        formData.append("picture", acceptedFiles[0]);
        await axios({
            method: "POST",
            url: "http://localhost:8000/api/user/updatePicture",
            withCredentials: true,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data" // set the Content-Type header to multipart/form-data
              }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const { userid } = useContext(UserContext);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpg': [],
            'image/jpeg': [],
          },
        onDrop: (acceptedFiles) => handleDropzoneSubmit(acceptedFiles),
    });

    return (
        <Container>
            <DropZoneWrapper {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} name="picture" />
                <ProfilPictureCss src={`/uploads/${userid}.jpg`} alt="pp"/>
            </DropZoneWrapper>
            <p style={{}}>@{username}</p>
        </Container>
    );
}

export default ProfilPicture;
