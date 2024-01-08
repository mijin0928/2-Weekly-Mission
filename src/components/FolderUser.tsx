import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useAsync from '../hook/useAsync';

const FolderUserContainer = styled.div`
  margin: 9.4rem 0 0;
  padding: 2rem 0 6rem 0;
  text-align: center;
  background-color: var(--bg);

  @media screen and (min-width: 375px) and (max-width: 768px) {
    margin: 6.3rem 0 0;
    padding: 1rem 0 4rem 0;
  }
`;

const UserProfileImg = styled.img`
  width: 6rem;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 4rem;
  }
`;

const UserName = styled.p`
  margin: 1.2rem 0 2rem 0;
  font-size: 1.6rem;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    margin: 0.6rem 0 1rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
`;

const FolderName = styled.p`
  font-size: 4rem;
  line-height: 4.8rem;
  font-weight: 600;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    font-size: 3.2rem;
    line-height: 3.8rem;
  }
`;

function FolderUser() {
  const [folderUserProfile, setFolderUserProfile] = useState<string | null>(null);
  const [folderUserName, setFolderUserName] = useState<string>('');
  const [folderName, setFolderName] = useState<string>('');
  const [getFolderSample] = useAsync('/sample/folder', '', '', '');

  const handleLoadFolder = async () => {
    const { folder } = await getFolderSample();
    setFolderName(folder?.name);
    setFolderUserName(folder?.owner?.name);
    setFolderUserProfile(folder?.owner?.profileImageSource);
  };

  useEffect(() => {
    handleLoadFolder();
  }, []);

  return (
    <FolderUserContainer>
      <UserProfileImg src={folderUserProfile !== null ? folderUserProfile : ''} alt="폴더 사용자 프로필 이미지" />
      <UserName>{folderUserName}</UserName>
      <FolderName>{folderName}</FolderName>
    </FolderUserContainer>
  );
}

export default FolderUser;
