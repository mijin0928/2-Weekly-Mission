import styled from 'styled-components';
import useAsync from '@/src/hook/useAsync';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function FolderUser() {
  const router = useRouter();
  const { id } = router.query;

  const { data: users, isLoading: usersLoading } = useAsync({
    baseUrl: '/users',
    folderId: '',
  });

  let userId;
  if (users) {
    userId = users[0].id;
  }

  const { data: folderUser, isLoading: folderUserLoading } = useAsync({
    baseUrl: '/users/',
    folderId: userId,
  });

  const { data: folders, isLoading: foldersLoading } = useAsync({
    baseUrl: '/folders/',
    folderId: id,
  });

  if (usersLoading || folderUserLoading || foldersLoading) return <div>Loading</div>;

  return (
    <FolderUserContainer>
      {folderUser && (
        <UserProfileImg>
          <Image
            fill
            src={folderUser[0].image_source}
            alt="폴더 사용자 프로필 이미지"
            object-fit="cover"
          />
        </UserProfileImg>
      )}
      <UserName>{folderUser[0].name}</UserName>
      <FolderName>{folders[0].name}</FolderName>
    </FolderUserContainer>
  );
}

const FolderUserContainer = styled.div`
  padding: 2rem 0 6rem 0;
  text-align: center;
  margin: 9rem 0 0;

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
