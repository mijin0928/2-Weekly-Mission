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

const mainContext = createContext<MainContext | null>(null);

export default mainContext;
