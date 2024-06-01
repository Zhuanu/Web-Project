import { useContext } from "react";
import { UserContext } from "../AppContext";
import styled from 'styled-components';
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ProfilPictureCss = styled.img`
    border-radius: 50%;
    height: 110px;
    width: 110px;
`;

const DropZoneWrapper = styled.div`
    border: 2px dashed #ccc;
    border-radius: 50%;
    width: 110px;
    height: 110px;
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
        userid === profil ? (
            <div className="d-flex align-items-center" style={{flexDirection: "column", margin: "20px"}}>
                <DropZoneWrapper {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} name="picture" />
                    {user?.profil?.picture ? <ProfilPictureCss src={`/uploads/${profil}.jpg`} alt="pp"/> : <ProfilPictureCss src={`/uploads/default.jpg`} alt="pp"/>}
                </DropZoneWrapper>
                <p className="text-info" style={{fontSize: "20px", margin: "10px 0 0 0", color: "whitesmoke"}}>@{user?.profil?.pseudo}</p>
            </div>
        ) : (
            <div className="d-flex align-items-center" style={{flexDirection: "column", margin: "20px"}}>
                {friend?.profil?.picture ? <ProfilPictureCss src={`/uploads/${profil}.jpg`} alt="pp"/> : <ProfilPictureCss src={`/uploads/default.jpg`} alt="pp"/>}
                <p className="text-info" style={{fontSize: "20px", margin: "10px 0 0 0", color: "whitesmoke"}}>@{friend?.profil?.pseudo}</p>
            </div>
        )

    );
}

export default ProfilPicture;
