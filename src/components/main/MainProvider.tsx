import MainContext from '@/src/components/main/MainContext';
import { useState, useEffect, ReactNode } from 'react';
import useAsync from '@/src/hook/useAsync';
import { Folder, Card } from '@/src/components/main/MainContext';
import { useRouter } from 'next/router';

interface MainProviderProps {
  cardUrl: string;
  children: ReactNode;
}

export default function MainProvider({ children, cardUrl }: MainProviderProps) {
  // const [selectedMenu, setSelectedMenu] = useState<string>('all');
  // const [title, setTitle] = useState<string>('');
  // const [buttonOption, setButtonOption] = useState<boolean>(false);
  // const [folderList, setFolderList] = useState<Folder[]>([]);
  // const [cardList, setCardList] = useState<Card[]>([]);
  // const [searchKeyword, setSearchKeyword] = useState<string>('');
  // const [searchResult, setSearchResult] = useState<Card[]>([]);
  // const [userId, setUserId] = useState<string>('');

  // const router = useRouter();
  // const { id } = router.query;

  // const [getFolderId] = useAsync({
  //   baseUrl: '/links?folderId=',
  //   folderId: id,
  // });

  // const handleFolderIdData = async () => {
  //   const { data } = await getFolderId();
  //   if(id) setSearchResult(data?.folder);
  // };

  // if (allLoading || getSelectedFolderLoading) {
  //   return;
  // }

  // useEffect(() => {
  //   handleSelectedFolder(selectedMenu);
  // }, [selectedMenu]);

  return (
    <>
      <MainContext.Provider
        value={{
          // cardList,
          // title,
          // searchResult,
          // buttonOption,
          // selectedMenu,
          // folderList,
          // searchKeyword,
          // cardUrl,
          // userId,
          // handleClickMenu,
          // handleChangeSearch,
        }}
      >
        {children}
      </MainContext.Provider>
    </>
  );
}
