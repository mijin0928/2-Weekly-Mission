import { useContext } from 'react';
import styled from 'styled-components';
import ModalContext from '@/src/components/modal/ModalContext';
import MainContext, { Folder } from '@/src/components/main/MainContext';
interface All {
  id: string;
  name: string;
}
interface TabMenuListProps {
  folderList: Folder[];
  $selectedMenu: string;
  handleClickMenu: (folder: Folder) => void;
}

function TabMenuList({
  folderList,
  $selectedMenu,
  handleClickMenu,
}: TabMenuListProps) {
  const All: All = {
    id: 'all',
    name: '전체',
  };
  const folderListArr = [...folderList];
  folderListArr.unshift(All);

  const item = folderListArr.map((folder) => (
    <li key={folder.id}>
      <button
        type="button"
        className={$selectedMenu === folder.id ? 'active' : ''}
        onClick={() => handleClickMenu(folder)}
      >
        {folder.name}
      </button>
    </li>
  ));
  return item;
}

export default function TabMenu() {
  const { folderList, selectedMenu, handleClickMenu } = useContext(MainContext);
  const { handleModalOpen } = useContext(ModalContext);

  return (
    <>
      <TabMenuContainer>
        <ul>
          <TabMenuList
            folderList={folderList}
            handleClickMenu={handleClickMenu}
            $selectedMenu={selectedMenu}
          />
        </ul>
        <Button
          type="button"
          onClick={() => handleModalOpen('folderListAdd')}
        ></Button>
      </TabMenuContainer>
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
