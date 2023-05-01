import { useContext, useState } from 'react';
import { UserContext } from '../Composants/AppContext';
import styled from "styled-components";


import Log from '../Composants/Log/Log';
import BasicInfo from '../Composants/Profil/BasicInfo';
import ProfilPicture from '../Composants/Profil/ProfilPicture';
import MyFollowers from '../Composants/Profil/MyFollowers';
import MyFollowing from '../Composants/Profil/MyFollowing';
import Bio from '../Composants/Profil/Bio';
import EditProfil from '../Composants/Profil/EditProfil';

const Container = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 60px;
`;

const Container3 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 60px;
`;


const Profil = () => {
    const { profil, userid } = useContext(UserContext);
    const [friend, setFriend] = useState({});

    return (
        userid 
        ? 
        (<div className='profile-page'>
            <h1>Profile Page</h1>
            <Container3>
                <ProfilPicture friend={friend} />
                <Container2>
                    {userid === profil ? <EditProfil /> : null}
                    <Container>
                        <MyFollowers setFriend={setFriend} />
                        <MyFollowing setFriend={setFriend} />
                    </Container>
                </Container2>
            </Container3>
            <Bio />
            {userid === profil ? <BasicInfo /> : null}
        </div>)
        :
        (<div className='log-page'>
            <div className='log-container'>
                <Log />
                <div className='img-container'>
                </div>
            </div>
        </div>)
    );
};

export default Profil;
