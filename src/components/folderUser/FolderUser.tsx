import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useAsync from '@/src/hook/useAsync';
import Image from 'next/image';

export default function FolderUser() {
  const [folderUserProfile, setFolderUserProfile] = useState<string | null>(
    null
  );
  const [folderUserName, setFolderUserName] = useState<string>('');
  const [folderName, setFolderName] = useState<string>('');
  const [getFolderSample] = useAsync({
    baseUrl: '/sample/folder',
    folderId: '',
    path: '',
    userId: '',
  });

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
      {folderUserProfile && (
        <UserProfileImg>
          <Image
            fill
            src={folderUserProfile !== null ? folderUserProfile : ''}
            alt="폴더 사용자 프로필 이미지"
            object-fit="cover"
          />
        </UserProfileImg>
      )}
      <UserName>{folderUserName}</UserName>
      <FolderName>{folderName}</FolderName>
    </FolderUserContainer>
  );
}

const FolderUserContainer = styled.div`
  padding: 2rem 0 6rem 0;
  text-align: center;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    margin: 6.3rem 0 0;
    padding: 1rem 0 4rem 0;
  }
`;

const UserProfileImg = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
  margin: 0 auto;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
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
