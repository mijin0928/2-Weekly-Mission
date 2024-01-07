import mainContext from './mainContext';
import { useState, useEffect } from 'react';
import useAsync from '../../hook/useAsync';

function MainProvider({ children, cardUrl }) {
  const [selectedMenu, setSelectedMenu] = useState('all');
  const [title, setTitle] = useState('');
  const [buttonOption, setButtonOption] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [getfolderList] = useAsync('/users', '/1', '/folders', '');
  const [getFolderAll] = useAsync('/users', '/1', '/links', '');
  const [getFolderData] = useAsync(
    '/users',
    '/1',
    '/links?folderId=',
    selectedMenu
  );

  const handleClickMenu = (folder) => {
    setSelectedMenu(folder?.id);
    setButtonOption(folder?.name !== '전체' && true);
    setTitle(folder?.name !== '전체' && folder?.name);
  };

  const handleLoadFolderList = async () => {
    const { data } = await getfolderList();
    setFolderList(data);
  };

  const handleLoadFolderData = async (options) => {
    if (options !== 'all') {
      const { data } = await getFolderData(options);
      setCardList(data);
    } else {
      const { data } = await getFolderAll();
      setCardList(data);
    }
  };

  const handleChangeSearch = (e) => {
    setSearchKeyword(e.target.value);

    const filterItem = cardList.filter(
      (card) =>
        card?.title?.includes(e.target.value.toLowerCase()) ||
        card?.description?.includes(e.target.value.toLowerCase()) ||
        card?.url?.includes(e.target.value.toLowerCase())
    );
    setSearchResult(filterItem);

    if (!e.target.value) return setSearchResult(cardList);
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
      <mainContext.Provider
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
      </mainContext.Provider>
    </>
  );
}

export default MainProvider;
