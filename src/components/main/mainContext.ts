import { createContext } from 'react';

export interface Folder {
  id: string;
  name: string;
}

interface MainContext {
  selectedMenu: string;
  title: string;
  buttonOption: boolean;
  folderList: string[];
  cardList: string[];
  searchKeyword: string;
  searchResult: string[];
  handleClickMenu: (folder: Folder) => void;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const mainContext = createContext<MainContext | null>(null);

export default mainContext;
