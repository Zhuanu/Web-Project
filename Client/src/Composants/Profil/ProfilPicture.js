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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfilPicture = ({ friend }) => {
    const { userid, profil, user, setUser } = useContext(UserContext);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpg': [],
            'image/jpeg': [],
          },
        onDrop: (acceptedFiles) => handleDropzoneSubmit(acceptedFiles),
    });


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
            console.log("data ProfilPicture", res.data);
            setUser(res.data.user)
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
                {user?.profil.picture ? <ProfilPictureCss src={`/uploads/${profil}.jpg`} alt="pp"/> : <ProfilPictureCss src={`/uploads/default.jpg`} alt="pp"/>}
            </DropZoneWrapper>
            <p>@{user?.profil.pseudo}</p>
        </Container>
        ) :
        (<Container>
            {friend?.profil.picture ? <ProfilPictureCss src={`/uploads/${profil}.jpg`} alt="pp"/> : <ProfilPictureCss src={`/uploads/default.jpg`} alt="pp"/>}
            <p>@{user?.profil.pseudo}</p>
        </Container>
        )

    );
}

export default ProfilPicture;
