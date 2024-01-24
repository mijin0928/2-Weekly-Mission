import ButtonOption from '@/src/components/buttonOption/ButtonOption';
import TabMenu from '@/src/components/tabMenu/TabMenu';
import SearchBar from '@/src/components/searchBar/SearchBar';
import Modal from '@/src/components/modal/Modal';
import FolderCard from '@/src/components/card/FolderCard';

export default function Main() {
  return (
    <>
      <Modal />
      <SearchBar />
      <TabMenu />
      <ButtonOption />
      <FolderCard />
    </>
  );
}
