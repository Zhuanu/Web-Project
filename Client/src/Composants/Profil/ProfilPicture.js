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
    const { userid, profil } = useContext(UserContext);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpg': [],
          },
        onDrop: (acceptedFiles) => handleDropzoneSubmit(acceptedFiles),
    });

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
            setUsername(res.data.profil.pseudo)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [profil, userid]);

    const handleDropzoneSubmit = async (acceptedFiles) => {
        const formData = new FormData();
        formData.append("picture", acceptedFiles[0]);
        await axios({
            method: "POST",
            url: "http://localhost:8000/api/user/updatePicture",
            withCredentials: true,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
              }
        })
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        userid === profil ? 
        (<Container>
            <DropZoneWrapper {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} name="picture" />
                <ProfilPictureCss src={`/uploads/${profil}.jpg`} alt="pp"/>
            </DropZoneWrapper>
            <p>@{username}</p>
        </Container>
        ) :
        (<Container>
            <ProfilPictureCss src={`/uploads/${profil}.jpg`} alt="pp"/>
            <p>@{username}</p>
        </Container>
        )

    );
}

export default ProfilPicture;
