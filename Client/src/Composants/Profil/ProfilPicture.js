import { useContext } from "react";
import { UserContext } from "../AppContext";
import styled from 'styled-components';
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ProfilPictureCss = styled.img`
    border-radius: 50%;
    height: 100px;
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



const ProfilPicture = () => {
    const { user } = useContext(UserContext);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/jpg': [],
            'image/jpeg': [],
            'image/png': []
          },
        onDrop: (acceptedFiles) => handleDropzoneSubmit(acceptedFiles),
    });


    const handleDropzoneSubmit = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileName = file.name;
        const filePath = `public/${fileName}`;
        await axios({
            method: "POST",
            url: "http://localhost:8000/api/user/updatePicture",
            withCredentials: true,
            data: {
                picture: filePath,
                fileName: fileName,
                file: file
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className="profil-comp">
            <h1>Profil</h1>
            {/* <RoundImg src={user.profil.picture} alt="avatar" /> */}
            <section className="container">
                <DropZoneWrapper {...getRootProps({className: 'dropzone'})}>
                    <ProfilPictureCss src="https://i.pinimg.com/originals/c6/9e/cd/c69ecdcf899d0e29cc4bd8deef643f45.jpg" alt="pp"/>
                    <input {...getInputProps()} />
                </DropZoneWrapper>
                <p>@{user.profil.pseudo}</p>
            </section>
            <p>bio</p>
            <p>Followers</p>
            <p>Following</p>
        </div>
    );
}

export default ProfilPicture;
