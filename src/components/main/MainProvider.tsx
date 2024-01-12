import MainContext from '@/src/components/main/MainContext';
import { useState, useEffect, useCallback, ReactNode } from 'react';
import useAsync from '@/src/hook/useAsync';
import { Folder, Card } from '@/src/components/main/MainContext';

interface MainProviderProps {
  cardUrl: string;
  children: ReactNode;
}

export default function MainProvider({ children, cardUrl }: MainProviderProps) {
  const [selectedMenu, setSelectedMenu] = useState<string>('all');
  const [title, setTitle] = useState<string>('');
  const [buttonOption, setButtonOption] = useState<boolean>(false);
  const [folderList, setFolderList] = useState<Folder[]>([]);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Card[]>([]);
  const [getfolderList] = useAsync('/users', '/1', '/folders', '');
  const [getFolderAll] = useAsync('/users', '/1', '/links', '');
  const [getFolderData] = useAsync(
    '/users',
    '/1',
    '/links?folderId=',
    selectedMenu
  );

  const handleClickMenu = useCallback((folder: Folder) => {
    setSelectedMenu(folder?.id);
    setButtonOption(folder?.name !== '전체' && true);
    setTitle(folder?.name !== '전체' ? folder?.name : '');
  }, []);

  const handleLoadFolderList = async () => {
    const { data } = await getfolderList();
    setFolderList(data);
  };

  const handleLoadFolderData = async (options: string) => {
    if (options !== 'all') {
      const { data } = await getFolderData();
      setCardList(data);
    } else {
      const { data } = await getFolderAll();
      setCardList(data);
    }
  };

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);

      const filterItem = cardList.filter(
        (card: Card) =>
          card?.title?.includes(e.target.value.toLowerCase()) ||
          card?.description?.includes(e.target.value.toLowerCase()) ||
          card?.url?.includes(e.target.value.toLowerCase())
      );
      setSearchResult(filterItem);

      if (!e.target.value) setSearchResult(cardList);
    },
    [cardList]
  );

  useEffect(() => {
    handleLoadFolderList();
  }, []);

  useEffect(() => {
    handleLoadFolderData(selectedMenu);
  }, [selectedMenu]);

  useEffect(() => {
    setSearchResult(cardList);
  }, [cardList]);

  return (
    <>
      <MainContext.Provider
        value={{
          cardList,
          title,
          searchResult,
          buttonOption,
          selectedMenu,
          folderList,
          searchKeyword,
          cardUrl,
          handleClickMenu,
          handleChangeSearch,
        }}
      >
        {children}
      </MainContext.Provider>
    </>
  );
}
