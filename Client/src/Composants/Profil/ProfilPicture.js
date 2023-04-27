import { useContext } from "react";
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



const ProfilPicture = () => {

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
        <div className="profil-comp">
            <h1>Profil</h1>
            {/* <RoundImg src={user.profil.picture} alt="avatar" /> */}
            <section className="container">
                <DropZoneWrapper {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} name="picture" />
                    <ProfilPictureCss src={`/uploads/${userid}.jpg`} alt="pp"/>
                </DropZoneWrapper>
                {/* <ProfilPictureCss src="https://i.pinimg.com/originals/c6/9e/cd/c69ecdcf899d0e29cc4bd8deef643f45.jpg" alt="pp"/> */}




                {/*<form method="POST" action="http://localhost:8000/api/user/updatePicture" encType="multipart/form-data">
                    <input type="file" name="picture" className="picture"></input>
                    <input type="submit" value="Envoyer"></input>
                </form> */}
                {/* <p>@{user.profil.pseudo}</p> */}
            </section>
            <p>bio</p>
        </div>
    );
}

export default ProfilPicture;
