import ProfilPicture from '../Composants/Profil/ProfilPicture';
import MyFollowers from '../Composants/Profil/MyFollowers';
import MyFollowing from '../Composants/Profil/MyFollowing';
import Bio from '../Composants/Profil/Bio';

import styled from "styled-components";

const Container = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 60px;
`;


const Container2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 60px;
`;

const ProfilFriend = () => {

    return (
        <div className='profile-page'>
            <h1>Profile Page</h1>
            <Container2>
                <ProfilPicture />
                    <Container>
                        <MyFollowers />
                        <MyFollowing />
                    </Container>
            </Container2>
            <Bio />
        </div>
    );
};

export default ProfilFriend;