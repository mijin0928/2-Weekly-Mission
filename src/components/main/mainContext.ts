import { createContext } from 'react';

export interface Folder {
  id: string;
  name: string;
}

export interface Card {
  title: string;
  url: string;
  description: string;
}

interface MainContext {
  selectedMenu: string;
  title: string;
  buttonOption: boolean;
  folderList: Folder[];
  cardList: Card[];
  searchKeyword: string;
  searchResult: Card[];
  cardUrl: string;
  handleClickMenu: (folder: Folder) => void;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const mainContext = createContext<MainContext>({
  selectedMenu: '',
  title: '',
  buttonOption: false,
  folderList: [],
  cardList: [],
  searchKeyword: '',
  searchResult: [],
  cardUrl: '',
  handleClickMenu: () => {},
  handleChangeSearch: () => {},
});
export default mainContext;
