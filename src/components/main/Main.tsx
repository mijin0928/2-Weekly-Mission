import ButtonOption from '@/src/components/main/ButtonOption';
import TabMenu from '@/src/components/main/TabMenu';
import SearchBar from '@/src/components/main/SearchBar';
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
