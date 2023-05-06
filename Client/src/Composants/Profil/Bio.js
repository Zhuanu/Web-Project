import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../AppContext';

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 1rem;
`;

const Bio = ({ friend }) => {
    const { user, userid, profil } = useContext(UserContext);
    return (
        userid === profil ? (
          <DescriptionContainer>
              <p>Member since <span className='text-break'>{user?.profil?.creationDate}</span></p>
              <p>{user?.profil?.bio}</p>
          </DescriptionContainer>
        ) : (
          <DescriptionContainer>
              <p>Member since <span>{friend?.profil?.creationDate}</span></p>
              <p>{friend?.profil?.bio}</p>
          </DescriptionContainer>
        )
    );
}

export default Bio;