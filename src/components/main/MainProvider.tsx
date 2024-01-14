import MainContext from '@/src/components/main/MainContext';
import { useState, useEffect, ReactNode } from 'react';
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
  const [getfolderList] = useAsync({
    baseUrl: '/users',
    folderId: '/1',
    path: '/folders',
  });
  const [getFolderAll] = useAsync({
    baseUrl: '/users',
    folderId: '/1',
    path: '/links',
  });
  const [getFolderData] = useAsync({
    baseUrl: '/users',
    folderId: '/1',
    path: '/links?folderId=',
    userId: selectedMenu,
  });

  const handleClickMenu = (folder: Folder) => {
    setSelectedMenu(folder?.id);
    setButtonOption(folder?.name !== '전체' && true);
    setTitle(folder?.name !== '전체' ? folder?.name : '');
  };

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

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);

    const filterItem = cardList.filter(
      (card: Card) =>
        card?.title?.includes(e.target.value.toLowerCase()) ||
        card?.description?.includes(e.target.value.toLowerCase()) ||
        card?.url?.includes(e.target.value.toLowerCase())
    );
    setSearchResult(filterItem);

    if (!e.target.value) setSearchResult(cardList);
  };

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
