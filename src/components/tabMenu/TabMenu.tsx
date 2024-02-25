import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalContext from '@/src/components/modal/ModalContext';
import { useRouter } from 'next/router';
import { All } from '@/constant';
import useAsync from '@/src/hook/useAsync';
import ButtonOption from '@/src/components/buttonOption/ButtonOption';
import FolderCard from '../card/FolderCard';
import SearchBar from '../searchBar/SearchBar';
interface TabMenuListProps {
  folderList: Folder[];
  $selectedMenu: string | boolean;
  handleClickMenu: (folder: Folder) => void;
  id: number | string;
}

function TabMenuList({
  folderList,
  $selectedMenu,
  handleClickMenu,
  id,
}: TabMenuListProps) {
  const item = folderList.map((folder) => (
    <li key={folder?.id}>
      <button
        type="button"
        className={id === folder?.id ? 'active' : ''}
        onClick={() => handleClickMenu(folder)}
      >
        {folder?.name}
      </button>
    </li>
  ));

  return (
    <>
      <button
        type="button"
        className={!id && $selectedMenu === All.id ? 'active' : ''}
        onClick={() => handleClickMenu(All)}
      >
        전체
      </button>
      {item}
    </>
  );
}

export default function TabMenu() {
  const { handleModalOpen } = useContext(ModalContext);
  const [selectedMenu, setSelectedMenu] = useState<string>('all');
  const [title, setTitle] = useState<string>('');
  const [buttonOption, setButtonOption] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Card[]>([]);

  const router = useRouter();
  const id = Number(router.query.id);

  const { data: folders, isLoading: foldersLoading } = useAsync({
    baseUrl: '/folders',
    folderId: '',
  });

  const { data: all, isLoading: allLoading } = useAsync({
    baseUrl: '/links',
    folderId: '',
  });

  const { data: selectedFolder, isLoading: selectedFolderLoading } = useAsync({
    baseUrl: `/folders/${selectedMenu}`,
    folderId: '/links',
  });

  const cardList = selectedMenu !== 'all' ? selectedFolder : all;

  const handleClickMenu = (folder: Folder) => {
    setSelectedMenu(folder.id);
    setButtonOption(folder.name !== '전체' && true);
    setTitle(folder.name !== '전체' ? folder.name : '');
    router.push(folder.name !== '전체' ? `/folder/${folder.id}` : '/folder');
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);

    const filterItem = cardList.filter(
      (card: Card) =>
        card.title.includes(e.target.value.toLowerCase()) ||
        card.description?.includes(e.target.value.toLowerCase()) ||
        card.url.includes(e.target.value.toLowerCase())
    );
    setSearchResult(filterItem);
    if (!e.target.value) setSearchResult(cardList);
  };

  useEffect(() => {
    if (cardList) {
      setSearchResult(cardList);
    }
  }, [cardList]);

  if (foldersLoading || allLoading || selectedFolderLoading) {
    return;
  }

  return (
    <>
      <SearchBar
        handleChangeSearch={handleChangeSearch}
        searchKeyword={searchKeyword}
      />
      <TabMenuContainer>
        <ul>
          <TabMenuList
            folderList={folders}
            handleClickMenu={handleClickMenu}
            $selectedMenu={selectedMenu}
            id={id}
          />
        </ul>
        <Button
          type="button"
          onClick={() => handleModalOpen('folderListAdd')}
        ></Button>
      </TabMenuContainer>
      <ButtonOption
        title={title}
        buttonOption={buttonOption}
        selectedMenu={selectedMenu}
      />
      <FolderCard searchResult={searchResult} />
    </>
  );
}

const TabMenuContainer = styled.div`
  position: relative;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem 0.8rem;
    list-style-type: none;

    li {
      line-height: 1.9rem;
    }

    button {
      display: block;
      padding: 0 1.2rem;
      height: 3.5rem;
      font-size: 1.6rem;
      border-radius: 5px;
      border: 1px solid var(--primary);
      background-color: var(--white);
      cursor: pointer;

      @media screen and (min-width: 375px) and (max-width: 768px) {
        font-size: 1.4rem;
      }

      &.active {
        color: var(--white);
        background-color: var(--primary);
      }
    }
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 1.6rem;
  height: 1.6rem;
  border: none;
  cursor: pointer;
  background: url('/image/btn-add.svg') no-repeat;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    display: none;
  }
`;
