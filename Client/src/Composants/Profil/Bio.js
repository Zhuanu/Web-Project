import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../AppContext';

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
//   align-items: center;
  margin-bottom: 20px;
`;

const Bio = () => {
    const { user } = useContext(UserContext);
    return (
        <DescriptionContainer>
            <p>Member since {user?.profil.creationDate}</p>
            <p>Bio: {user?.profil.bio}</p>
        </DescriptionContainer>
    );
}

export default Bio;