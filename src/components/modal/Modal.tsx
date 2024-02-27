import styled, { css } from 'styled-components';
import shareKakao from '@/src/components/shareKakao/shareKakao';
import { useContext, useState } from 'react';
import ModalContext from '@/src/components/modal/ModalContext';
import Image from 'next/image';
import useModalAsync from '@/src/hook/useModalAsync';
import useAsync from '@/src/hook/useAsync';
interface Folder {
  id: string;
  title: string;
  name: string;
  link_count: number;
}

interface Props {
  title: string;
  selectedMenu: string;
  folderList: Folder[];
}

async function clipBoard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert(text);
  } catch (error) {
    console.error(error);
  }
}

function shareFacebook({ title }: { title: string }, currentUrl: string) {
  const facebookUrl = encodeURIComponent(`${currentUrl}`);
  const facebookTitle = title;

  window.open(
    `http://www.facebook.com/sharer.php?u=${facebookUrl}&t=${facebookTitle}`,
    '',
    'width=400, height=400'
  );
}

function FolderItem({ folderList }: { folderList: Folder[] }) {
  const [selectedFolder, setSelectedFolder] = useState<string>('');

  const handleClickFolderList = (folder: Folder) =>
    setSelectedFolder(folder.name);

  const item = folderList.map((folder) => (
    <Item
      key={folder.id}
      onClick={() => handleClickFolderList(folder)}
      className={selectedFolder === folder.name ? 'active' : ''}
    >
      <Name>{folder.name}</Name>
      <Count>{folder.link_count}개</Count>
    </Item>
  ));

  return item;
}

export default function Modal({ title, selectedMenu, folderList }: Props) {
  const { modalOpen, handleModalClose, type, cardUrl } =
    useContext(ModalContext);
  const {
    values,
    handleValuesChange,
    folderAdd,
    folderListAdd,
    edit,
    folderRemove,
    linkRemove,
  } = useModalAsync(cardUrl);
  
  const { data: users, isLoading: usersLoading } = useAsync({
    baseUrl: '/users',
    folderId: '',
  });
  if (usersLoading) return <div>Loading</div>;

  let host;
  if (typeof window !== 'undefined') host = window.location.href;

  const userId = users[0].id;
  const folderId = selectedMenu;
  const currentUrl = `${host}/shared?user=${userId}&folderId=${folderId}`;

  function ModalType() {
    switch (type) {
      case 'share':
        return '폴더 공유';
      case 'edit':
        return '폴더 이름 변경';
      case 'folderRemove':
        return '폴더 삭제';
      case 'linkRemove':
        return '링크 삭제';
      case 'folderAdd':
        return '폴더에 추가';
      case 'folderListAdd':
        return '폴더 추가';
      default:
        return;
    }
  }

  function ButtonType() {
    switch (type) {
      case 'edit':
        return '변경하기';
      case 'folderRemove':
        return '삭제하기';
      case 'linkRemove':
        return '삭제하기';
      case 'folderAdd':
        return '추가하기';
      case 'folderListAdd':
        return '추가하기';
      default:
        return;
    }
  }

  const handleButtonClick = () => {
    handleModalClose();

    switch (type) {
      case 'edit':
        return edit();
      case 'folderRemove':
        return folderRemove();
      case 'linkRemove':
        return linkRemove();
      case 'folderAdd':
        return folderAdd();
      case 'folderListAdd':
        return folderListAdd();
      default:
        return;
    }
  };

  return (
    <>
      <ModalContainer $modalOpen={modalOpen}>
        <Title>
          <ModalType />
        </Title>
        {type === 'edit' || type === 'folderListAdd' ? (
          <Input
            type="text"
            placeholder="내용 입력"
            onChange={handleValuesChange}
            value={values.name}
            name="name"
          />
        ) : (
          <Text>
            {type === 'linkRemove' || type === 'folderAdd' ? cardUrl : title}
          </Text>
        )}
        {type === 'folderAdd' && (
          <FolderList>
            <FolderItem folderList={folderList} />
          </FolderList>
        )}
        {type !== 'share' ? (
          <Button
            type="button"
            className={
              type === 'folderRemove' || type === 'linkRemove' ? 'red' : ''
            }
            onClick={handleButtonClick}
          >
            <ButtonType />
          </Button>
        ) : (
          <Sns>
            <li>
              <Image
                src="/image/ico-kakao-share.svg"
                alt="카카오톡"
                width={42}
                height={42}
                onClick={() => shareKakao({ title }, currentUrl)}
              />
              카카오톡
            </li>
            <li>
              <Image
                src="/image/ico-facebook-share.svg"
                alt="페이스북"
                width={42}
                height={42}
                onClick={() => {
                  shareFacebook({ title }, currentUrl);
                }}
              />
              페이스북
            </li>
            <li>
              <Image
                src="/image/ico-link-copy.svg"
                alt="링크 복사"
                width={42}
                height={42}
                onClick={() => clipBoard(currentUrl)}
              />
              링크 복사
            </li>
          </Sns>
        )}
        <CloseButton type="button" onClick={handleModalClose}>
          닫기
        </CloseButton>
      </ModalContainer>
      <Dim $modalOpen={modalOpen}></Dim>
    </>
  );
}

const ModalContainer = styled.div<{ $modalOpen?: boolean }>`
  display: ${({ $modalOpen }) => ($modalOpen ? 'block' : 'none')};
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 36rem;
  padding: 3.2rem 4rem;
  border: 1px solid var(--gray20);
  border-radius: 1.5rem;
  z-index: 999;
  background-color: var(--white);
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  color: var(--gray100);
`;

const Input = styled.input`
  width: 28rem;
  margin: 2.4rem 0 1.5rem 0;
  padding: 1.8rem 1.5rem;
  font-size: 1.6rem;
  outline: none;
  border: 1px solid var(--primary);
  border-radius: 0.8rem;
  color: var(--gray100);
`;

const Text = styled.p`
  margin: 0.8rem 0 2.4rem 0;
  text-align: center;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: var(--gray60);
`;

const Button = styled.button`
  border: none;
  width: 28rem;
  padding: 1.6rem 0;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  color: var(--white);
  background: linear-gradient(90.99deg, #6d6afe 0.12%, #6ae3fe 101.84%);
  cursor: pointer;

  &.red {
    background: var(--red);
  }
`;

const CloseButton = styled.button`
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  border: none;
  position: absolute;
  right: 1.6rem;
  top: 1.6rem;
  width: 2.4rem;
  height: 2.4rem;
  background: url('/image/btn-close-modal.svg') no-repeat;
  background-size: cover;
  cursor: pointer;
`;

const Dim = styled.div<{ $modalOpen?: boolean }>`
  display: ${({ $modalOpen }) => ($modalOpen ? 'block' : 'none')};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: var(--black-000);
  opacity: 0.4;
`;

const Sns = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 3.2rem;

  li {
    font-size: 1.3rem;
    cursor: pointer;

    img {
      display: block;
      margin: 0 0 1rem 0;
    }
  }
`;

const FolderList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin: 0 0 2.4rem 0;
`;

const selectedFolder = css`
  border-radius: 0.8rem;
  background-color: var(--bg);
`;

const Item = styled.li`
  position: relative;
  cursor: pointer;

  &:hover {
    ${selectedFolder}
  }

  & + & {
    margin: 1.1rem 0 0;
  }

  &.active {
    ${selectedFolder}

    p {
      color: var(--primary);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0.8rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.4rem;
      height: 1.4rem;
      background: url('/image/ico-check.svg') no-repeat;
    }
  }
`;

const Name = styled.p`
  display: inline-block;
  padding: 0.8rem;
  font-size: 1.6rem;
  color: var(--gray100);
`;

const Count = styled.span`
  margin: 0 0 0 0.8rem;
  font-size: 1.4rem;
  color: var(--gray60);
`;
